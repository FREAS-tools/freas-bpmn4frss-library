import definition from './definition';
import properties from './properties';

// types
import type { FrssElement } from '../../types';

/**
 * Allows marking a data store as a Evidence Store
 */
const EvidenceStore: FrssElement = {
  definition,
  properties,
};

export default EvidenceStore;
