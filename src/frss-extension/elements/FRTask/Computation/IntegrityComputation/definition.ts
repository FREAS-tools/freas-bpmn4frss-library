import computationProperties from '../properties';
import integrityComputationProperties from './properties';

import type { FrssModdleSemanticDefinition } from '../../../../types/definitions';

const { name } = integrityComputationProperties;

const integrityComputationDefinition: FrssModdleSemanticDefinition = {
  name,
  properties: [],
  superClass: [computationProperties.identifier],
};

export default integrityComputationDefinition;
