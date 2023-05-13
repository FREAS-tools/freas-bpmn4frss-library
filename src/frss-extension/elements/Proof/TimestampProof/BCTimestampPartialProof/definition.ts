import timestampProofProperties from '../properties';
import bcTimestampPartialProofProperties from './properties';
import type {
  FrssModdleSemanticDefinition,
} from '../../../../types/definitions';

const { name } = bcTimestampPartialProofProperties;

const bcTimestampPartialProofDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: [timestampProofProperties.identifier],
  properties: [],
};

export default bcTimestampPartialProofDefinition;
