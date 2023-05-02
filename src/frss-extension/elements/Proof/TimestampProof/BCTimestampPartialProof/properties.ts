import { createIdentifier } from '../../../common';
import type { FrssProperties } from '../../../../types/properties';

const name = 'BCTimestampPartialProof';

const bcTimestampPartialProofProperties: FrssProperties = {
  name,
  nameLowercase: 'bc-timestamp-partial-proof',
  identifier: createIdentifier(name),
};

export default bcTimestampPartialProofProperties;
