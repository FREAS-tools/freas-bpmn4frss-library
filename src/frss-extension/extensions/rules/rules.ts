/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import BpmnRules from 'bpmn-js/lib/features/rules/BpmnRules';

// checking reconnection
import { checkReconnection } from './ruleProvider';

export default class FrssRules extends BpmnRules {
  static $inject: string[];

  elementRegistry: any;

  constructor(eventBus: any, injector: any, elementRegistry: any) {
    super(eventBus);
    injector.invoke(BpmnRules, this);
    this.elementRegistry = elementRegistry;
  }

  canConnectAssociation(source: any, target: any) {
    const checkCustomReconnection = checkReconnection(
      source,
      target,
      this.elementRegistry,
    );

    // no suitable rule found, default behaviour happens
    if (checkCustomReconnection === undefined) {
      return super.canConnectAssociation(source, target);
    }

    // custom rule has ran, now we need to check if the reconnection can happen
    return checkCustomReconnection !== false;
  }
}

FrssRules.$inject = [
  'eventBus',
  'injector',
  'elementRegistry',
];
