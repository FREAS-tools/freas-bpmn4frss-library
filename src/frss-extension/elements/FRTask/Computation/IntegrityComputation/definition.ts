import computationProperties from '../properties';
import integrityComputationProperties from './properties';

import type { FrssModdleDefinition } from '../../../../types/definitions';

const { name } = integrityComputationProperties;

const integrityComputationDefinition: FrssModdleDefinition = {
  name,
  properties: [],
  superClass: [computationProperties.identifier],
};

export default integrityComputationDefinition;
