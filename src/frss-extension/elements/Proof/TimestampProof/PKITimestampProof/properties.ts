import { createIdentifier } from '../../../common';
import type { FrssProperties } from '../../../../types/properties';

const name = 'PKITimestampProof';

const pkiTimestampProofProperties: FrssProperties = {
  name,
  nameLowercase: 'pki-timestamp-proof',
  identifier: createIdentifier(name),
};

export default pkiTimestampProofProperties;
