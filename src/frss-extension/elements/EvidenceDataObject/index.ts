import controls from './controls';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';
import rules from './rules';

// types
import type { FrssElement } from '../../types';

/**
 * EvidenceDataObject extends bpmn:DataObject and allows storing
 * the PotentialEvidence
 *
 * Represented in the diagram as bpmn:DataObjectReference
 */
const EvidenceDataObject: FrssElement = {
  controls,
  definition,
  properties,
  rendererEntry,
  rules,
};

export default EvidenceDataObject;
