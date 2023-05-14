import controls from './controls';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';
import type { FrssElement } from '../../../../types';

/**
 * Element which represents the external blockchain timestamping service
 * (represented as a version of a bpmn:Participant)
 */
const BCTimestampService: FrssElement = {
  controls,
  definition,
  properties,
  rendererEntry,
};

export default BCTimestampService;
