import properties from './properties';
import type { FrssModdleDefinition } from '../../types/definitions';

const { name } = properties;

const definition: FrssModdleDefinition = {
  name,
  extends: ['bpmn:Task'],
  properties: [],
};

export default definition;
