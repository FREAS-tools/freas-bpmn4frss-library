import computationProperties from '../properties';
import properties from './properties';

import type { FrssModdleDefinition } from '../../../../types/definitions';

const { name } = properties;

const definition: FrssModdleDefinition = {
  name,
  properties: [],
  superClass: [computationProperties.identifier],
};

export default definition;
