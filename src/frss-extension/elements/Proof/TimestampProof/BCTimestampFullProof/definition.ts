import timestampProofProperties from '../properties';
import bcTimestampFullProofProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../../../types/definitions';

const { name } = bcTimestampFullProofProperties;

const bcTimestampFullProofDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: [timestampProofProperties.identifier],
  properties: [],
};

export default bcTimestampFullProofDefinition;
