import timestampServiceProperties
  from '../../FRService/TimestampService/properties';
import timestampProofProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../../types/definitions';

const { name } = timestampProofProperties;

const timestampProofDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: ['bpmn:BaseElement'],
  properties: [
    {
      name: 'originatesFrom',
      type: timestampServiceProperties.identifier,
      isReference: true,
      isAttr: true,
    },
  ],
};

export default timestampProofDefinition;
