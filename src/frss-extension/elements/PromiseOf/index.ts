import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';

import type { FrssElement } from '../../types';

/**
 * Represents a relationship between BCTimestampPartialProof and
 * BCTimestampFullProof (the partial proof is a promise of the full proof)
 */
const PromiseOf: FrssElement = {
  definition,
  properties,
  rendererEntry,
};

export default PromiseOf;
