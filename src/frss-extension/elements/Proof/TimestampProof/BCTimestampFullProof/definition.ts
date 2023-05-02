import timestampProofProperties from '../properties';
import bcTimestampFullProofProperties from './properties';
import type { FrssModdleDefinition } from '../../../../types/definitions';

const { name } = bcTimestampFullProofProperties;

const bcTimestampFullProofDefinition: FrssModdleDefinition = {
  name,
  superClass: [timestampProofProperties.identifier],
  properties: [],
};

export default bcTimestampFullProofDefinition;
