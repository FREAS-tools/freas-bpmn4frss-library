import definition from './definition';
import properties from './properties';
import type { FrssElement } from '../../../../types';

/**
 * Represents a full proof that comes from a blockchain timestamp service
 */
const BCTimestampFullProof: FrssElement = {
  definition,
  properties,
};

export default BCTimestampFullProof;
