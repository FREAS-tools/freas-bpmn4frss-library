import computationProperties from '../properties';
import authenticityComputationProperties from './properties';

import type {
  FrssModdleSemanticDefinition,
} from '../../../../../types/definitions';

const { name } = authenticityComputationProperties;

const authenticityComputationDefinition: FrssModdleSemanticDefinition = {
  name,
  properties: [],
  superClass: [computationProperties.identifier],
};

export default authenticityComputationDefinition;
