import hashProofProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../../types/definitions';

const { name } = hashProofProperties;

const proofDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: ['bpmn:BaseElement'],
  properties: [],
};

export default proofDefinition;
