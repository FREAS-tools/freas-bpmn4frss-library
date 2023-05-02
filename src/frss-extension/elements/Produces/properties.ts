import { createIdentifier } from '../common';

// types
import type { FrssProperties } from '../../types/properties';

const name = 'Produces';

const producesProperties: FrssProperties = {
  identifier: createIdentifier(name),
  name,
  nameLowercase: 'produces',
};

export default producesProperties;
