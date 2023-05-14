import controls from './controls';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';
import type { FrssElement } from '../../types';

/**
 * Extension of a regular bpmn:Task which allows it to be marked as
 * Authenticity computation, Integrity computation, and Data Transformation.
 */
const ForensicReadinessTask: FrssElement = {
  controls,
  definition,
  properties,
  rendererEntry,
};

export default ForensicReadinessTask;
