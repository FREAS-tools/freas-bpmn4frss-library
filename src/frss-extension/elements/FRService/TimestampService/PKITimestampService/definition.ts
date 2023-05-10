import timestampServiceProperties from '../properties';
import pkiTimestampServiceProperties from './properties';
import type {
  FrssModdleSemanticDefinition,
} from '../../../../types/definitions';

const { name } = pkiTimestampServiceProperties;

const pkiTimestampServiceDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: [timestampServiceProperties.identifier],
  properties: [],
};

export default pkiTimestampServiceDefinition;
