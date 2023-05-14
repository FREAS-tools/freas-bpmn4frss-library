import definition from './definition';
import properties from './properties';
import type { FrssElement } from '../../types';

/**
 * bpmn:Participant meta extension, differentiating it from the regular
 * bpmn:Participant elements
 */
const ForensicReadinessService: FrssElement = {
  definition,
  properties,
};

export default ForensicReadinessService;
