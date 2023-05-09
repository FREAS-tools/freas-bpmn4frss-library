import cooperativenessProperties from '../Cooperativeness/properties';
import properties from './properties';
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = properties;

const evidenceContextDefinition: FrssModdleSemanticDefinition = {
  name,
  extends: ['bpmn:Participant'],
  properties: [
    {
      name: 'cooperativeness',
      type: cooperativenessProperties.identifier,
      isMany: false,
      isAttr: true,
    },
  ],
};

export default evidenceContextDefinition;
