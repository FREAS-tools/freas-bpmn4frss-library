import timestampProofProperties from '../properties';
import pkiTimestampProofProperties from './properties';
import type { FrssModdleDefinition } from '../../../../types/definitions';

const { name } = pkiTimestampProofProperties;

const pkiTimestampProofDefinition: FrssModdleDefinition = {
  name,
  superClass: [timestampProofProperties.identifier],
  properties: [],
};

export default pkiTimestampProofDefinition;
