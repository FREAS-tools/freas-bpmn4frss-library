// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
// the FRSS priority for the injector
import { FRSS_PRIORITY } from './common';

// lists of elements of interests
import {
  attachmentRules,
  // connectionRules,
  creationRules,
  elementsWithRules,
} from './customElements';
// types
import {
  AttachmentRule,
  // ConnectionRule,
  CreationRule,
} from './types/rules';

/**
 * Check if element is an element that has rules
 *
 * @param shape element to be checked
 * @returns true if the element has some rules
 *          false otherwise
 */
const isFrssElementWithRules = (shape: any | any[]): boolean => (
  // @TODO: should we check for many elements?
  shape && elementsWithRules.find(
    (element) => element.properties.identifier === shape.type,
  )
);

/**
 * Check if element can be attached to another element
 * @param source source element
 * @param target target element
 * @returns "attach" if the element should be attached
 */
const checkAttachment = (source: any, target: any): boolean | string | void => {
  if (!isFrssElementWithRules(source)) return;

  const rule: AttachmentRule | undefined = attachmentRules
    .find((ruleEntry) => ruleEntry.shouldCheckAttachment(source, target));

  if (!rule) return;

  return rule.attachmentRule(source, target);
};

// const checkConnection = (source: any, target: any): (boolean
// | { type: string } | void) => {
//   if (!isFrssElementWithRules(source)) return;

//   const rule: ConnectionRule | undefined = connectionRules
//     .find((ruleEntry) => ruleEntry.shouldCheckConnection(source, target));

//   if (!rule) return;

//   return rule.connectionRule(source, target);
// };

/**
 * Check if the source can create a target
 * @param source
 * @param target
 */
const checkCreation = (source: any, target: any): boolean | void => {
  // try to find a suitable rule
  const rule: CreationRule | undefined = creationRules
    .find((ruleEntry) => ruleEntry.shouldCheckCreation(source, target));
  // console.log(rule);

  // no rule was found (unlikely, but still we need the type safety)
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

      console.log(shape, target);
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

    // // @ts-ignore
    // this.addRule('connection.create', FRSS_PRIORITY, (context: any) => {
    //   const { source, target } = context;

    //   // only check frss elements when creating connection
    //   if (!isFrssElementWithRules(source)
    //     && !isFrssElementWithRules(target)) return;

    //   const hints = context.hints ?? {};
    //   const { targetParent, targetAttach } = hints;

    //   // if the target has already been set
    //   if (targetAttach) return false;

    //   // set the parent temporarily
    //   if (targetParent) target.parent = targetParent;

    //   try {
    //     // try to connect
    //     return checkConnection(source, target);
    //   } finally {
    //     // unset the temporary parent every time
    //     target.parent = null;
    //   }
    // });
  }
}

FrssRuleProvider.$inject = ['eventBus'];
