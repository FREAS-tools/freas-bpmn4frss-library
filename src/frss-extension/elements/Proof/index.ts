import definition from './definition';
import properties from './properties';
import type { FrssElement } from '../../types';

/**
 * Extension of a PotentialEvidence which strenghtens its significance
 * and allows marking it as a hash/timestamp proof (or both)
 */
const Proof: FrssElement = {
  definition,
  properties,
};

export default Proof;
