import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'Proof';

const proofProperties: FrssProperties = {
  name,
  nameLowercase: 'proof',
  identifier: createIdentifier(name),
};

export default proofProperties;
