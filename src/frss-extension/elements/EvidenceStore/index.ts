import controls from './controls';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';

import type { FrssElement } from '../../types';

/**
 * Element extends the bpmn:DataStoreReference (for some reason,
 * bpmn:DataStore works differently than the bpmn:DataObject)
 * and allows storing PotentialEvidence / proofs
 */
const EvidenceStore: FrssElement = {
  controls,
  definition,
  properties,
  rendererEntry,
};

export default EvidenceStore;
