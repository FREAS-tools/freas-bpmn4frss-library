import { createIdentifier } from '../../../common';
import type { FrssProperties } from '../../../../types/properties';

const name = 'BCTimestampFullProof';

const bcTimestampFullProofProperties: FrssProperties = {
  name,
  nameLowercase: 'bc-timestamp-full-proof',
  identifier: createIdentifier(name),
};

export default bcTimestampFullProofProperties;
