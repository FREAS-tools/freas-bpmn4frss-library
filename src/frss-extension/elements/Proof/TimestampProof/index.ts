import definition from './definition';
import properties from './properties';
import type { FrssElement } from '../../../types';

/**
 * Meta class represeniting a Timestamp proof, allowing it to be supplied
 * with concrete implementations later on
 */
const TimestampProof: FrssElement = {
  definition,
  properties,
};

export default TimestampProof;
