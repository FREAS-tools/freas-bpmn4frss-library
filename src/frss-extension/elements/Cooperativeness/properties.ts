import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'Cooperativeness';

const cooperativenessProperties: FrssProperties = {
  name,
  nameLowercase: 'cooperativeness',
  identifier: createIdentifier(name),
};

export default cooperativenessProperties;
