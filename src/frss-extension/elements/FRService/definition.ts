import frServiceProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = frServiceProperties;

const frServiceDefinition: FrssModdleSemanticDefinition = {
  name,
  extends: ['bpmn:Participant'],
  properties: [],
};

export default frServiceDefinition;
