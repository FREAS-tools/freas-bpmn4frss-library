import computationProperties from '../properties';
import authenticityComputationProperties from './properties';

import type { FrssModdleDefinition } from '../../../../types/definitions';

const { name } = authenticityComputationProperties;

const authenticityComputationDefinition: FrssModdleDefinition = {
  name,
  properties: [],
  superClass: [computationProperties.identifier],
};

export default authenticityComputationDefinition;
