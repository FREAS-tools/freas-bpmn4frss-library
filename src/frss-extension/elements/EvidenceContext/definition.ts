import cooperativenessProperties from '../Cooperativeness/properties';
import properties from './properties';
import type { FrssModdleDefinition } from '../../types/definitions';

const { name } = properties;

const evidenceContextDefinition: FrssModdleDefinition = {
  name,
  extends: ['bpmn:Pool'],
  properties: [
    {
      name: 'Cooperativeness',
      type: cooperativenessProperties.identifier,
      isMany: false,
      isAttr: true,
    },
  ],
};

export default evidenceContextDefinition;
