import timestampProofProperties from '../properties';
import bcTimestampPartialProofProperties from './properties';
import type { FrssModdleDefinition } from '../../../../types/definitions';

const { name } = bcTimestampPartialProofProperties;

const bcTimestampPartialProofDefinition: FrssModdleDefinition = {
  name,
  superClass: [timestampProofProperties.identifier],
  properties: [],
};

export default bcTimestampPartialProofDefinition;
