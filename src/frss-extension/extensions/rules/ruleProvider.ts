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

// types
import type {
  AttachmentRule,
  HasAttachmentRule,
} from '../../types/rules/attachment';
import type { Rule } from '../../types/rules/common';
import type {
  ConnectionRule,
  HasConnectionRule,
} from '../../types/rules/connection';
import type {
  CreationRule,
  HasCreationRule,
} from '../../types/rules/creation';

/**
 * Check if element can be attached to another element
 * @param source source element
 * @param target target element
 * @returns "attach" if the element should be attached
 *          false if the element should not be attached
 *          void if the element is not of this rule's concern
 */
const checkAttachment: Rule<ReturnType<AttachmentRule> | undefined> = (
  source,
  target,
  elementRegistry,
) => {
  const rule: HasAttachmentRule | undefined = attachmentRules
    .find((ruleEntry) => ruleEntry.shouldCheckAttachment(source, target));

  if (!rule) return;

  return rule.attachmentRule(source, target, elementRegistry);
};

const checkConnection: Rule<ReturnType<ConnectionRule> | undefined> = (
  source,
  target,
  elementRegistry,
) => {
  const rule: HasConnectionRule | undefined = connectionRules
    .find((ruleEntry) => ruleEntry.shouldCheckConnection(source, target));

  if (!rule) return;

  return rule.connectionRule(source, target, elementRegistry);
};

export const checkReconnection: Rule<ReturnType<ConnectionRule> | undefined> = (
  source,
  target,
  elementRegistry,
) => {
  const rule: HasConnectionRule | undefined = connectionRules
    .find((ruleEntry) => ruleEntry.shouldCheckConnection(source, target));

  if (!rule) return;

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

const checkCreation: Rule<ReturnType<CreationRule> | undefined> = (
  source,
  target,
  elementRegistry,
) => {
  // try to find a suitable rule
  const rule: HasCreationRule | undefined = creationRules
    .find((ruleEntry) => ruleEntry.shouldCheckCreation(source, target));

  // no rule was found
  if (!rule) return;

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
) => {
  const { source, target } = context;
  const hints = context.hints ?? {};
  const { targetParent, targetAttach } = hints;

  if (targetAttach) return false;

  // temporarily set parent to the hinted parent (snapped)
  if (targetParent) {
    target.parent = targetParent;
  }

  try {
    switch (hook) {
      case ConnectionRuleHook.Create:
        return checkConnection(source, target, elementRegistry);
      case ConnectionRuleHook.Reconnect:
        return checkReconnection(source, target, elementRegistry);
      default:
        return;
    }
  } finally {
    // unset temporary parent
    if (targetParent) {
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
  static $inject: string[];

  elementRegistry: any;

  constructor(eventBus: any, elementRegistry: any) {
    super(eventBus);

    this.elementRegistry = elementRegistry;
  }

  init() {
    // @ts-ignore
    this.addRule('shape.attach', FRSS_PRIORITY, (context: any) => {
      const { target, shape } = context;

      // we can only place one element at a time
      if (Array.isArray(shape) && shape.length !== 1) {
        return false;
      }

      return checkCreation(shape, target, this.elementRegistry);
    });

    // @ts-ignore
    this.addRule('elements.move', FRSS_PRIORITY, (context: any) => {
      const { shapes, target } = context;

      if (!shapes
        || !Array.isArray(shapes)
        || shapes.length !== 1
        // MUST CHECK otherwise it dies
        || target === undefined) {
        return;
      }

      const shape = shapes[0];

      return checkAttachment(shape, target, this.elementRegistry);
    });

    // @ts-ignore
    this.addRule('shape.create', FRSS_PRIORITY, (context: any) => {
      const { target, shape } = context;

      return checkCreation(shape, target, this.elementRegistry);
    });

    // @ts-ignore
    this.addRule(
      'connection.create',
      FRSS_PRIORITY,
      (context: any) => connectionCreateOrReconnect(
        context,
        ConnectionRuleHook.Create,
        this.elementRegistry,
      ),
    );

    // @ts-ignore
    this.addRule(
      'connection.reconnect',
      FRSS_PRIORITY,
      (context: any) => connectionCreateOrReconnect(
        context,
        ConnectionRuleHook.Reconnect,
        this.elementRegistry,
      ),
    );
  }
}

FrssRuleProvider.$inject = ['eventBus', 'elementRegistry'];
