import definition from './definition';
import properties from './properties';
import type { FrssElement } from '../../../../types';

/**
 * Represents a partial proof (promise)
 * that comes from a blockchain timestamp service
 */
const BCTimestampPartialProof: FrssElement = {
  definition,
  properties,
};

export default BCTimestampPartialProof;
