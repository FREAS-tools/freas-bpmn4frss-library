import computationProperties from './properties';
import type {
  FrssModdleSemanticDefinition,
} from '../../../../types/definitions';

const { name } = computationProperties;

const computationDefinition: FrssModdleSemanticDefinition = {
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
  superClass: ['bpmn:BaseElement'],
};

export default computationDefinition;
