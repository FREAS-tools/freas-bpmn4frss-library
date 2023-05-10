import bcTimestampFullProofProperties
  from '../Proof/TimestampProof/BCTimestampFullProof/properties';
import bcTimestampPartialProofProperties
  from '../Proof/TimestampProof/BCTimestampPartialProof/properties';
import promiseOfProperties from './properties';

// types
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = promiseOfProperties;

const promiseOfDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: ['bpmn:Association'],
  properties: [
    {
      name: 'sourceRef',
      type: bcTimestampPartialProofProperties.identifier,
      isReference: true,
      isAttr: true,
      redefines: 'bpmn:Association#sourceRef',
    },
    {
      name: 'targetRef',
      type: bcTimestampFullProofProperties.identifier,
      isReference: true,
      isAttr: true,
      redefines: 'bpmn:Association#targetRef',
    },
  ],
};

export default promiseOfDefinition;
