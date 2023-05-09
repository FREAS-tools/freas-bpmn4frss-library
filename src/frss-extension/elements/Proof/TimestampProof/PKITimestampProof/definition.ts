import timestampProofProperties from '../properties';
import pkiTimestampProofProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../../../types/definitions';

const { name } = pkiTimestampProofProperties;

const pkiTimestampProofDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: [timestampProofProperties.identifier],
  properties: [],
};

export default pkiTimestampProofDefinition;
