import { createIdentifier } from '../../common';
import type { FrssProperties } from '../../../types/properties';

const name = 'TimestampProof';

const timestampProofProperties: FrssProperties = {
  name,
  nameLowercase: 'timestamp-proof',
  identifier: createIdentifier(name),
};

export default timestampProofProperties;
