// @ts-ignore
import { isAny } from 'bpmn-js/lib/util/ModelUtil';

// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import { FRSS_PRIORITY } from './common';
import customElements from './customElements';

const isFrssElement = (element: any): boolean => isAny(
  element,
  customElements.map((customElement) => customElement.properties.identifier),
);

// /**
//  * Check if the source can create a target
//  * @param source
//  * @param target
//  */
const checkCreation = (source: any, target: any): boolean | void => {
  // the custom rules only check if the source is the frss element.
  if (!isFrssElement(source)) return;

  console.log(target);
};

//
const checkAttachment = (source: any, target: any): boolean | void => {
  if (!isFrssElement(source)) return;

  console.log(target);
};

const checkConnection = (source: any, target: any): boolean | void => true;

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

      if (!Array.isArray(shape) || shape.length !== 1) {
        return false;
      }

      return checkCreation(shape[0], target);
    });

    // @ts-ignore
    this.addRule('elements.move', FRSS_PRIORITY, (context: any) => {
      const { shape, target } = context;

      // if there is only one (or no) element, check the attachment
      if (!Array.isArray(shape) && shape) return checkAttachment(shape, target);

      // allow movement only if all elements can be moved
      // (and all elements are FRSS elements)
      // we can return undefined if it is out of our scope
      const returnValue = shape
        .map((shapeElement: any): boolean | void => (
          checkCreation(shapeElement, target)
        ))
        .reduce(
          (previous: boolean | undefined, next: any) => previous && next,
          true,
        );

      console.log(returnValue);

      return returnValue;
    });

    // @ts-ignore
    this.addRule('shape.create', FRSS_PRIORITY, (context: any) => {
      const { target, shape } = context;
      return checkCreation(shape, target);
    });

    // @ts-ignore
    this.addRule('connection.create', FRSS_PRIORITY, (context: any) => {
      const { source, target } = context;
      const hints = context.hints ?? {};
      const { targetParent, targetAttach } = hints;

      // if the targe
      if (targetAttach) return false;

      if (targetParent) target.parent = targetParent;

      try {
        return checkConnection(source, target);
      } finally {
        // unset the temporary parent
        target.parent = null;
      }
    });
  }
}

FrssRuleProvider.$inject = ['eventBus', 'ruleProvider'];
