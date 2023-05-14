import definition from './definition';
import properties from './properties';

// types
import type { FrssElement } from '../../types';

/**
 * Allows marking a data object as a Potential Evidence (a base object
 * which is then extended and strenghtened as a Proof)
 */
const PotentialEvidence: FrssElement = {
  definition,
  properties,
};

export default PotentialEvidence;
