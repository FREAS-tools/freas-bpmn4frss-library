/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error
import BpmnRules from 'bpmn-js/lib/features/rules/BpmnRules';

// checking reconnection
import { checkReconnection } from './ruleProvider';
import type FrssModeler from '../../../editor';

export default class FrssRules extends BpmnRules {
  static $inject: string[] = [
    'eventBus',
    'injector',
    'bpmnjs',
    'elementRegistry',
  ];

  elementRegistry: any;

  frssModeler: FrssModeler;

  constructor(
    eventBus: any,
    injector: any,
    frssModeler: FrssModeler,
    elementRegistry: any,
  ) {
    super(eventBus);
    injector.invoke(BpmnRules, this);
    this.elementRegistry = elementRegistry;
    this.frssModeler = frssModeler;
  }

  canConnectAssociation(source: any, target: any) {
    const checkCustomReconnection = checkReconnection(
      source,
      target,
      this.elementRegistry,
      this.frssModeler.diagramMode,
    );

    // no suitable rule found, default behaviour happens
    if (checkCustomReconnection === undefined) {
      return super.canConnectAssociation(source, target);
    }

    // custom rule has ran, now we need to check if the reconnection can happen
    return checkCustomReconnection !== false;
  }
}
