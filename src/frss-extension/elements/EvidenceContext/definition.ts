import cooperativenessProperties from '../Cooperativeness/properties';
import properties from './properties';
import type { FrssModdleDefinition } from '../../types/definitions';

const { name } = properties;

const evidenceContextDefinition: FrssModdleDefinition = {
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
