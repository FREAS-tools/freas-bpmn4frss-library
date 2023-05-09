import timestampProofProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../../types/definitions';

const { name } = timestampProofProperties;

const timestampProofDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: ['bpmn:BaseElement'],
  properties: [],
};

export default timestampProofDefinition;
