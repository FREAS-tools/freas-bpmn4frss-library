import controls from './controls';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';

import type { FrssElement } from '../../types';

/**
 * Extension of a bpmn:Participant which allows people to set and retrieve
 * the cooperativeness value
 */
const EvidenceContext: FrssElement = {
  controls,
  definition,
  properties,
  rendererEntry,
};

export default EvidenceContext;
