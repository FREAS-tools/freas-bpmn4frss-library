// @ts-expect-error
// eslint-disable-next-line import/no-extraneous-dependencies
import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
// the FRSS priority for the injector
import { FRSS_PRIORITY } from '../../common';

// lists of elements of interests
import {
  attachmentRules,
  connectionRules,
  creationRules,
} from '../../elements';

import FrssModeProvider, { FrssMode } from '../mode/mode';

// types
import type {
  AttachmentRule,
  HasAttachmentRule,
} from '../../types/rules/attachment';
import type {
  RuleFunctionWrapper,
} from '../../types/rules/common';
import type {
  ConnectionRule,
  HasConnectionRule,
} from '../../types/rules/connection';
import type {
  CreationRule,
  HasCreationRule,
} from '../../types/rules/creation';

/**
 * Handles situation when a rule was not found for an element.
 * The parameters source and target are defined but not used here to allow
 * future extensions (perhaps if different diagram mode is added, which
 * would need a more delicate rule decline option).
 *
 * @param source source of the operation
 * @param target target of the operation
 * @param mode the mode of the diagram which determines what we do during the
 *             rule execution
 * @returns false if the mode prohibits original roles
 *          undefined if the mode allows original roles to take over
 */
const handleNotFoundRule = (
  _source: any,
  _target: any,
  mode: FrssMode,
): boolean | undefined => {
  switch (mode) {
    case FrssMode.Normal: {
      return undefined;
    }
    case FrssMode.EvidenceView: {
      return false;
    }
    default: {
      return undefined;
    }
  }
};

/**
 * Check if element can be attached to another element
 *
 * @param source source element
 * @param target target element
 * @returns "attach" if the element should be attached
 *          false if the element should not be attached
 *          void if the element is not of this rule's concern
 */
const checkAttachment: RuleFunctionWrapper<ReturnType<AttachmentRule>
| undefined> = (
  source,
  target,
  elementRegistry,
  mode,
) => {
  const rule: HasAttachmentRule | undefined = attachmentRules
    .find(
      (ruleEntry) => ruleEntry.shouldCheckAttachment(source, target, mode),
    );

  // the rule was not found
  if (rule === undefined) {
    return handleNotFoundRule(source, target, mode);
  }

  return rule.attachmentRule(source, target, elementRegistry);
};

const checkConnection: RuleFunctionWrapper<ReturnType<ConnectionRule>
| undefined> = (
  source,
  target,
  elementRegistry,
  mode,
) => {
  const rule: HasConnectionRule | undefined = connectionRules
    .find(
      (ruleEntry) => ruleEntry.shouldCheckConnection(source, target, mode),
    );

  // the rule was not found
  if (rule === undefined) {
    return handleNotFoundRule(source, target, mode);
  }

  return rule.connectionRule(source, target, elementRegistry);
};

export const checkReconnection: RuleFunctionWrapper<ReturnType<ConnectionRule>
| undefined> = (
  source,
  target,
  elementRegistry,
  mode,
) => {
  const rule: HasConnectionRule | undefined = connectionRules
    .find(
      (ruleEntry) => ruleEntry.shouldCheckConnection(source, target, mode),
    );

  // the rule was not found
  if (rule === undefined) {
    return handleNotFoundRule(source, target, mode);
  }

  const findExistingAssociation = (element: any) => (
    (element.source.id === source.id && element.target.id === target.id)
    || (element.source.id === target.id && element.target.id === source.id)
  );

  // get the association we want to check
  const getExistingAssociation = source.outgoing.find(findExistingAssociation)
    ?? target.outgoing.find(findExistingAssociation);

  // find its id (always string, but undefined put here as safeguard)
  const connectionId: string | undefined = (
    getExistingAssociation.id ?? undefined
  );

  return rule.connectionRule(source, target, elementRegistry, connectionId);
};

const checkCreation: RuleFunctionWrapper<ReturnType<CreationRule>
| undefined> = (
  source,
  target,
  elementRegistry,
  mode,
) => {
  // try to find a suitable rule
  const rule: HasCreationRule | undefined = creationRules
    .find(
      (ruleEntry) => ruleEntry.shouldCheckCreation(source, target, mode),
    );

  // the rule was not found
  if (rule === undefined) {
    return handleNotFoundRule(source, target, mode);
  }

  // rule found, execute
  return rule.creationRule(source, target, elementRegistry);
};

enum ConnectionRuleHook {
  Create = 'create',
  Reconnect = 'reconnect',
}

const connectionCreateOrReconnect = (
  context: any,
  hook: ConnectionRuleHook,
  elementRegistry: any,
  mode: FrssMode,
) => {
  const { source, target } = context;
  const hints = context.hints ?? {};
  const { targetParent, targetAttach } = hints;

  if (targetAttach) return false;

  // temporarily set parent to the hinted parent (snapped)
  if (targetParent !== undefined) {
    target.parent = targetParent;
  }

  try {
    // trigger a rule checker depending on which hook is running
    switch (hook) {
      case ConnectionRuleHook.Create:
        return checkConnection(source, target, elementRegistry, mode);

      // checks for identity with custom associations which can only
      // be attached once per a source-target pair
      case ConnectionRuleHook.Reconnect:
        return checkReconnection(source, target, elementRegistry, mode);
      default:
        return;
    }
  } finally {
    // unset temporary parent
    if (targetParent !== undefined) {
      target.parent = null;
    }
  }
};

/*
 *
 *    MAIN FOCUS OF THIS FILE
 *
 *
 */

export default class FrssRuleProvider extends RuleProvider {
  static $inject: string[] = [
    'eventBus',
    'frssModeProvider',
    'elementRegistry',
  ];

  elementRegistry: any;

  frssModeProvider: FrssModeProvider;

  constructor(
    eventBus: any,
    frssModeProvider: FrssModeProvider,
    elementRegistry: any,
  ) {
    super(eventBus);

    this.elementRegistry = elementRegistry;
    this.frssModeProvider = frssModeProvider;
  }

  init() {
    // @ts-expect-error
    this.addRule('shape.attach', FRSS_PRIORITY, (context: any) => {
      const { target, shape } = context;

      // we can only place one element at a time
      if (Array.isArray(shape) && shape.length !== 1) {
        return false;
      }

      return checkCreation(
        shape,
        target,
        this.elementRegistry,
        this.frssModeProvider.mode,
      );
    });

    // @ts-expect-error
    this.addRule('elements.move', FRSS_PRIORITY, (context: any) => {
      const { shapes, target } = context;

      if (
        // MUST CHECK otherwise it dies
        shapes === undefined
        || target === undefined
        // ============================
        || !Array.isArray(shapes)
        || shapes.length !== 1
      ) {
        return;
      }

      const shape = shapes[0];

      return checkAttachment(
        shape,
        target,
        this.elementRegistry,
        this.frssModeProvider.mode,
      );
    });

    // @ts-expect-error
    this.addRule('shape.create', FRSS_PRIORITY, (context: any) => {
      const { shape, target } = context;

      return checkCreation(
        shape,
        target,
        this.elementRegistry,
        this.frssModeProvider.mode,
      );
    });

    // @ts-expect-error
    this.addRule(
      'connection.create',
      FRSS_PRIORITY,
      (context: any) => (
        connectionCreateOrReconnect(
          context,
          ConnectionRuleHook.Create,
          this.elementRegistry,
          this.frssModeProvider.mode,
        )
      ),
    );

    // @ts-expect-error
    this.addRule(
      'connection.reconnect',
      FRSS_PRIORITY,
      (context: any) => (
        connectionCreateOrReconnect(
          context,
          ConnectionRuleHook.Reconnect,
          this.elementRegistry,
          this.frssModeProvider.mode,
        )
      ),
    );
  }
}
