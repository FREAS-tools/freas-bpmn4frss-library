import hashProofProperties from './properties';
import type { FrssModdleDefinition } from '../../../types/definitions';

const { name } = hashProofProperties;

const proofDefinition: FrssModdleDefinition = {
  name,
  superClass: ['bpmn:BaseElement'],
  properties: [],
};

export default proofDefinition;
