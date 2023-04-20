import frTaskProperties from '../properties';
import properties from './properties';
import type { FrssModdleDefinition } from '../../../types/definitions';

const { name } = properties;

const definition: FrssModdleDefinition = {
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
  ],
  superClass: [frTaskProperties.identifier],
};

export default definition;
