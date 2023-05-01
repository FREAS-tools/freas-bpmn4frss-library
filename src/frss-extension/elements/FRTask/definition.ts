import properties from './properties';
import type { FrssModdleDefinition } from '../../types/definitions';

const { name } = properties;

const definition: FrssModdleDefinition = {
  name,
  extends: ['bpmn:Task'],
  properties: [
    {
      name: 'input',
      type: 'bpmn:BaseElement',
      isAttr: true,
      isReference: true,
    },
  ],
};

export default definition;
