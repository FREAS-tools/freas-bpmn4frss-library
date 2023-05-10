import timestampServiceProperties from '../properties';
import bcTimestampServiceProperties from './properties';
import type {
  FrssModdleSemanticDefinition,
} from '../../../../types/definitions';

const { name } = bcTimestampServiceProperties;

const bcTimestampServiceDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: [timestampServiceProperties.identifier],
  properties: [],
};

export default bcTimestampServiceDefinition;
