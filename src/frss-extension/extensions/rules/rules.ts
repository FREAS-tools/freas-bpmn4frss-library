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
  frssElementsWithRules,
} from '../../elements';

// types
import type { HasAttachmentRule } from '../../types/rules/attachment';
import type { HasConnectionRule } from '../../types/rules/connection';
import type { HasCreationRule } from '../../types/rules/creation';

/**
 * Check if element is an element that has rules
 *
 * @param shape element to be checked
 * @returns true if the element has some rules
 *          false otherwise
 */
const isFrssElementWithRules = (shape: any | any[]): boolean => (
  // @TODO: should we check for many elements?
  shape && (frssElementsWithRules.find(
    (element) => element.properties.identifier === shape.type,
  ) !== undefined)
);

/**
 * Check if element can be attached to another element
 * @param source source element
 * @param target target element
 * @returns "attach" if the element should be attached
 *          false if the element should not be attached
 *          void if the element is not of this rule's concern
 */
const checkAttachment = (source: any, target: any): boolean | string | void => {
  if (!isFrssElementWithRules(source)) return;

  const rule: HasAttachmentRule | undefined = attachmentRules
    .find((ruleEntry) => ruleEntry.shouldCheckAttachment(source, target));

  if (!rule) return;

  return rule.attachmentRule(source, target);
};

const checkConnection = (source: any, target: any): (boolean
| { type: string } | void) => {
  const rule: HasConnectionRule | undefined = connectionRules
    .find((ruleEntry) => ruleEntry.shouldCheckConnection(source, target));

  if (!rule) return;

  return rule.connectionRule(source, target);
};

const checkCreation = (source: any, target: any): boolean | void => {
  // try to find a suitable rule
  const rule: HasCreationRule | undefined = creationRules
    .find((ruleEntry) => ruleEntry.shouldCheckCreation(source, target));

  // no rule was found
  if (!rule) return;

  // rule found, execute
  return rule.creationRule(source, target);
};

export default class FrssRuleProvider extends RuleProvider {
  static $inject: string[];

  ruleProvider: any;

  constructor(eventBus: any, ruleProvider: any) {
    super(eventBus);

    this.ruleProvider = ruleProvider;
  }

  init() {
    // @ts-ignore
    this.addRule('shape.attach', FRSS_PRIORITY, (context: any) => {
      const { target, shape } = context;

      // the custom rules only check if the source is the frss element.
      if (!isFrssElementWithRules(shape)) return;

      // we can only place one element at a time
      if (Array.isArray(shape) && shape.length !== 1) {
        return false;
      }

      return checkCreation(shape, target);
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

      if (!isFrssElementWithRules(shape)) return;

      return checkAttachment(shape, target);
    });

    // @ts-ignore
    this.addRule('shape.create', FRSS_PRIORITY, (context: any) => {
      const { target, shape } = context;

      // the custom rules only check if the source is the frss element.
      if (!isFrssElementWithRules(shape)) return;

      return checkCreation(shape, target);
    });

    // @ts-ignore
    this.addRule('connection.create', FRSS_PRIORITY, (context: any) => {
      const { source, target } = context;
      const hints = context.hints ?? {};
      const { targetParent, targetAttach } = hints;

      if (targetAttach) return false;

      // temporarily set parent to the hinted parent (snapped)
      if (targetParent) {
        target.parent = targetParent;
      }

      try {
        return checkConnection(source, target);
      } finally {
        // unset temporary parent
        if (targetParent) {
          target.parent = null;
        }
      }
    });
  }
}

FrssRuleProvider.$inject = ['eventBus'];
