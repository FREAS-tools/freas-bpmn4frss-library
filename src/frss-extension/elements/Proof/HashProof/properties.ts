import { createIdentifier } from '../../common';
import type { FrssProperties } from '../../../types/properties';

const name = 'HashProof';

const hashProofProperties: FrssProperties = {
  name,
  nameLowercase: 'hash-proof',
  identifier: createIdentifier(name),
};

export default hashProofProperties;
