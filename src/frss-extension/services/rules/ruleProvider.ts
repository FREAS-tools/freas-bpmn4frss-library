/* eslint-disable no-param-reassign */
// @ts-ignore
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
  RuleFunctionWrapper, RuleFunctionWrapperContext,
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
 * @param context context of the rule
 * @returns "attach" if the element should be attached
 *          false if the element should not be attached
 *          void if the element is not of this rule's concern
 */
const checkAttachment: RuleFunctionWrapper<ReturnType<AttachmentRule>
| undefined> = (
  {
    source,
    target,
    elementRegistry,
    mode,
  },
) => {
  const rule: HasAttachmentRule | undefined = attachmentRules
    .find(
      (ruleEntry) => ruleEntry.shouldCheckAttachment({ source, target, mode }),
    );

  // the rule was not found
  if (rule === undefined) {
    return handleNotFoundRule(source, target, mode);
  }

  return rule.attachmentRule({
    source, target, elementRegistry, mode,
  });
};

/**
 * Check if element can be connected to another element
 *
 * @param context context of the rule
 * @returns {type: identifier} if the element can be connected
 *          false if the element should not be connected
 *          void if the element is not of this rule's concern
 */
const checkConnection: RuleFunctionWrapper<ReturnType<ConnectionRule>
| undefined> = (
  {
    source,
    target,
    elementRegistry,
    mode,
  },
) => {
  const rule: HasConnectionRule | undefined = connectionRules
    .find(
      (ruleEntry) => ruleEntry.shouldCheckConnection({ source, target, mode }),
    );

  // the rule was not found
  if (rule === undefined) {
    return handleNotFoundRule(source, target, mode);
  }

  return rule.connectionRule({
    source, target, elementRegistry, mode,
  });
};

/**
 * Check if element can be reconnected to another element
 *
 * @param context context of the rule
 * @returns {type: identifier} if the element can be reconnected
 *          false if the element should not be reconnected
 *          void if the element is not of this rule's concern
 */
export const checkReconnection: RuleFunctionWrapper<ReturnType<ConnectionRule>
| undefined> = (
  {
    source,
    target,
    elementRegistry,
    mode,
  },
) => {
  const rule: HasConnectionRule | undefined = connectionRules
    .find(
      (ruleEntry) => ruleEntry.shouldCheckConnection({ source, target, mode }),
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

  return rule.connectionRule({
    source, target, elementRegistry, mode, identityId: connectionId,
  });
};

/**
 * Decide whether an element can be created
 * @param context context of the rule
 * @returns true if the element can be created
 *          false if the element cannot be created
 *          void if the element is not of this rule's concern
 */
const checkCreation: RuleFunctionWrapper<ReturnType<CreationRule>
| undefined> = (
  {
    source,
    target,
    elementRegistry,
    mode,
  },
) => {
  // try to find a suitable rule
  const rule: HasCreationRule | undefined = creationRules
    .find(
      (ruleEntry) => ruleEntry.shouldCheckCreation({ source, target, mode }),
    );

  // the rule was not found
  if (rule === undefined) {
    return handleNotFoundRule(source, target, mode);
  }

  // rule found, execute
  return rule.creationRule({
    source, target, elementRegistry, mode,
  });
};

enum ConnectionRuleHook {
  Create = 'create',
  Reconnect = 'reconnect',
}

/**
 * Decide between checking connection and reconnection (identity)
 * @param context context of the rule
 * @returns {type: identifier} if the element can be (re)connected
 *          false if the element should not be (re)connected
 *          void if the element is not of this rule's concern
 */
const connectionCreateOrReconnect = (
  {
    source,
    target,
    hints,
    hook,
    elementRegistry,
    mode,
  } : RuleFunctionWrapperContext & {
    hints: any
    hook: ConnectionRuleHook,
  },
) => {
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
        return checkConnection({
          source, target, elementRegistry, mode,
        });

      // checks for identity with custom associations which can only
      // be attached once per a source-target pair
      case ConnectionRuleHook.Reconnect:
        return checkReconnection({
          source, target, elementRegistry, mode,
        });
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

/**
 * Extension of a regular BPMN rule provider which handles rules for
 * elements and connections
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
    this.addRule('shape.attach', FRSS_PRIORITY, (context: any) => {
      const { target, shape } = context;

      // we can only place one element at a time
      if (Array.isArray(shape) && shape.length !== 1) {
        return false;
      }

      return checkCreation(
        {
          source: shape,
          target,
          elementRegistry: this.elementRegistry,
          mode: this.frssModeProvider.mode,
        },
      );
    });

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
        {
          source: shape,
          target,
          elementRegistry: this.elementRegistry,
          mode: this.frssModeProvider.mode,
        },
      );
    });

    this.addRule('shape.create', FRSS_PRIORITY, (context: any) => {
      const { shape, target } = context;

      return checkCreation(
        {
          source: shape,
          target,
          elementRegistry: this.elementRegistry,
          mode: this.frssModeProvider.mode,
        },
      );
    });

    this.addRule(
      'connection.create',
      FRSS_PRIORITY,
      (context: any) => (
        connectionCreateOrReconnect(
          {
            source: context.source,
            target: context.target,
            hints: context.hints ?? {},
            hook: ConnectionRuleHook.Create,
            elementRegistry: this.elementRegistry,
            mode: this.frssModeProvider.mode,
          },
        )
      ),
    );

    this.addRule(
      'connection.reconnect',
      FRSS_PRIORITY,
      (context: any) => (
        connectionCreateOrReconnect(
          {
            source: context.source,
            target: context.target,
            hints: context.hints ?? {},
            hook: ConnectionRuleHook.Reconnect,
            elementRegistry: this.elementRegistry,
            mode: this.frssModeProvider.mode,
          },
        )
      ),
    );
  }
}
