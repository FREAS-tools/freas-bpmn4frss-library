import frTaskProperties from '../properties';
import computationProperties from './properties';
import type { FrssModdleDefinition } from '../../../types/definitions';

const { name } = computationProperties;

const computationDefinition: FrssModdleDefinition = {
  name,
  properties: [
    {
      name: 'input',
      type: 'bpmn:DataObject',
      isAttr: true,
      isReference: true,
    },
    {
      name: 'output',
      type: 'bpmn:DataObject',
      isAttr: true,
      isReference: true,
    },
  ],
  superClass: [frTaskProperties.identifier],
};

export default computationDefinition;
