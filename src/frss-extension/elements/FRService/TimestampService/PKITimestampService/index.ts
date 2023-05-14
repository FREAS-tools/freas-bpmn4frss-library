import controls from './controls';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';
import type { FrssElement } from '../../../../types';

/**
 * Element which represents an external PKI timestamping service
 * (represented as a version of a bpmn:Participant)
 */
const PKITimestampService: FrssElement = {
  controls,
  definition,
  properties,
  rendererEntry,
};

export default PKITimestampService;
