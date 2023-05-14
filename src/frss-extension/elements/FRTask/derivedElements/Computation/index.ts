import definition from './definition';
import properties from './properties';

import type { FrssElement } from '../../../../types';

/**
 * Meta element which Authenticity Computation and Integrity Computation
 * are based on
 */
const Computation: FrssElement = {
  definition,
  properties,
};

export default Computation;
