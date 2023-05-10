import frServiceProperties from '../properties';
import timestampServiceProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../../types/definitions';

const { name } = timestampServiceProperties;

const timestampServiceDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: [frServiceProperties.identifier],
  properties: [],
};

export default timestampServiceDefinition;
