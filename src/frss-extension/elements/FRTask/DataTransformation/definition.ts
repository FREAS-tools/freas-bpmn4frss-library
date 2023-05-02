import frTaskProperties from '../properties';
import dataTransformationProperties from './properties';
import type { FrssModdleDefinition } from '../../../types/definitions';

const { name } = dataTransformationProperties;

const dataTransformationDefinition: FrssModdleDefinition = {
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
  superClass: [frTaskProperties.identifier],
};

export default dataTransformationDefinition;
