// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import { FRSS_PRIORITY } from './common';
import customElements from './customElements';
import { hasPreCreateRule, PreCreateFrssElement } from './types';

/**
* This adds further processing logic when a custom connection is created.
* It properly hooks all the properties.
*/
export default class FrssCreateBehavior extends CommandInterceptor {
  static $inject: string[];

  constructor(eventBus: any, injector: any) {
    super(eventBus);
    injector.invoke(CommandInterceptor, this);

    /* The TS ignore is needed for the hydeous way they wrote this
     * part of diagram-js. Whenever I tried to induce TypeScript
     * into the question, the whole lib just fell apart. Therefore,
     * this injection of the preExecute hook is unchecked and I doubt
     * I will find a way to make this work in TypeScript
     */
    // @ts-ignore
    this.preExecute('connection.create', FRSS_PRIORITY, (element: any) => {
      const hasRule: PreCreateFrssElement | undefined = customElements
        .filter((customElement): customElement is PreCreateFrssElement => (
          hasPreCreateRule(customElement)
        )).find((customElement) => (
          customElement.preCreateRule.shouldTrigger(element)
        ));

      if (!hasRule) return;

      // trigger the rule the element has one
      hasRule.preCreateRule.trigger(element);
    });
  }
}

FrssCreateBehavior.$inject = ['eventBus', 'injector'];
