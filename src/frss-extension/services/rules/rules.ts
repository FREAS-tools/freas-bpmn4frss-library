/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import BpmnRules from 'bpmn-js/lib/features/rules/BpmnRules';

// checking reconnection
import { checkReconnection } from './ruleProvider';
import type FrssModeProvider from '../mode/mode';

/**
 * Extension of regular BPMN rules, allowing to reconnect custom
 * connections (EvidenceAssociation, Produces, PromiseOf)
 */
export default class FrssRules extends BpmnRules {
  static $inject: string[] = [
    'eventBus',
    'injector',
    'frssModeProvider',
    'elementRegistry',
  ];

  elementRegistry: any;

  frssModeProvider: FrssModeProvider;

  constructor(
    eventBus: any,
    injector: any,
    frssModeProvider: FrssModeProvider,
    elementRegistry: any,
  ) {
    super(eventBus);
    injector.invoke(BpmnRules, this);
    this.elementRegistry = elementRegistry;
    this.frssModeProvider = frssModeProvider;
  }

  canConnectAssociation(source: any, target: any) {
    const checkCustomReconnection = checkReconnection(
      {
        source,
        target,
        elementRegistry: this.elementRegistry,
        mode: this.frssModeProvider.mode,
      },
    );

    // no suitable rule found, default behaviour happens
    if (checkCustomReconnection === undefined) {
      return super.canConnectAssociation(source, target);
    }

    // custom rule has ran, now we need to check if the reconnection can happen
    return checkCustomReconnection !== false;
  }
}
