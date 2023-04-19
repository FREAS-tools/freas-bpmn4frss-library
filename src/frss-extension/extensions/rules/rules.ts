/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import BpmnRules from 'bpmn-js/lib/features/rules/BpmnRules';

import { connectionRules } from '../../elements';

export default class FrssRules extends BpmnRules {
  static $inject: string[];

  constructor(eventBus: any, injector: any) {
    super(eventBus);
    injector.invoke(BpmnRules, this);
  }

  canConnectAssociation(source: any, target: any) {
    // find a suitable rule from FRSS extension
    const foundRule = connectionRules.find(
      (rule) => rule.shouldCheckConnection(source, target),
    );

    // no suitable rule found, default behaviour happens
    if (!foundRule) return super.canConnectAssociation(source, target);

    // get the association we want to check
    const getExistingAssociation = source.outgoing.find(
      (element: any) => (
        element.source.id === source.id && element.target.id === target.id
      ),
    );

    // find its id (always string, but undefined put here as safeguard)
    const connectionId: string | undefined = (
      getExistingAssociation.id ?? undefined
    );

    // execute the custom rule
    const result = foundRule.connectionRule(source, target, connectionId);

    // check the result of the connection rule -> cannot be undefined or false!
    return result !== false && result !== undefined;
  }
}

FrssRules.$inject = [
  'eventBus',
  'injector',
];
