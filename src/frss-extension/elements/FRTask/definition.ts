import frTaskProperties from './properties';
import type { FrssModdleDefinition } from '../../types/definitions';

const { name } = frTaskProperties;

const frTaskDefinition: FrssModdleDefinition = {
  name,
  extends: ['bpmn:Task'],
  properties: [
    {
      name: 'isAuthenticityComputation',
      type: 'bpmn:BaseElement',
      isMany: false,
    },
    {
      name: 'isIntegrityComputation',
      type: 'bpmn:BaseElement',
      isMany: false,
    },
    {
      name: 'isDataTransformation',
      type: 'bpmn:BaseElement',
      isMany: false,
    },
  ],
};

export default frTaskDefinition;
