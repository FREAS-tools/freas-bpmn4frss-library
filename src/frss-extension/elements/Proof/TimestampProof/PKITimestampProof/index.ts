import definition from './definition';
import properties from './properties';
import type { FrssElement } from '../../../../types';

/**
 * Represents a proof that comes from the PKI Timestamping service
 */
const PKITimestampProof: FrssElement = {
  definition,
  properties,
};

export default PKITimestampProof;
