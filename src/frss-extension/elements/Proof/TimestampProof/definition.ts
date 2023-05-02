import timestampProofProperties from './properties';
import type { FrssModdleDefinition } from '../../../types/definitions';

const { name } = timestampProofProperties;

const timestampProofDefinition: FrssModdleDefinition = {
  name,
  superClass: ['bpmn:BaseElement'],
  properties: [],
};

export default timestampProofDefinition;
