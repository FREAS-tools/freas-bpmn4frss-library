import dataTransformationProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../../types/definitions';

const { name } = dataTransformationProperties;

const dataTransformationDefinition: FrssModdleSemanticDefinition = {
  name,
  properties: [
    {
      name: 'input',
      type: 'string',
      isAttr: true,
      isReference: true,
    },
    {
      name: 'output',
      type: 'string',
      isAttr: true,
      isReference: true,
    },
    {
      name: 'script',
      type: 'string',
      isAttr: true,
      isReference: true,
    },
  ],
  superClass: ['bpmn:BaseElement'],
};

export default dataTransformationDefinition;
