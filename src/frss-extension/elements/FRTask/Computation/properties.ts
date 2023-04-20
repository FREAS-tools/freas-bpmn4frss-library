import { createIdentifier } from '../../common';
import type { FrssProperties } from '../../../types/properties';

const name = 'Computation';

const properties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'computation',
};

export default properties;
