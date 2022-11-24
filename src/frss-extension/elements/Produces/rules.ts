// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

import { ElementRules } from '../../types/rules';

import { connectionCollectionName } from '../EvidenceSource/definition';
import properties from './properties';

const rules: ElementRules = {
  shouldTriggerPreCreate: (event: any) => {
    const { connection } = event.context;

    return is(connection, properties.identifier);
  },
  preCreateRule: (event) => {
    const { context } = event;
    const { connection } = context;

    // set the target and the source in moddle
    connection.businessObject.set('sourceRef', context.source.businessObject);
    connection.businessObject.set('targetRef', context.target.businessObject);

    // set parent of the currently created connection
    connection.businessObject.$parent = context.parent.businessObject; // EvidenceSource

    // obtain all other collections of the parent - source (EvidenceSource)
    const connectionCollection = context.source.businessObject
      .get(connectionCollectionName);

    // add this connection to the list of connections of the parent
    connectionCollection.push(connection.businessObject);
  },
};

export default rules;