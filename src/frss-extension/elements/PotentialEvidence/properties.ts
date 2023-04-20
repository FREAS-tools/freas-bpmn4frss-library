import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'PotentialEvidence';

const properties: FrssProperties = {
  identifier: createIdentifier(name),
  name,
  nameLowercase: 'potential-evidence',
};

export default properties;
