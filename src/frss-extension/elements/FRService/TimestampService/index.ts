import definition from './definition';
import properties from './properties';
import type { FrssElement } from '../../../types';

/**
 * Abstract meta definition for creating Timestamping services
 */
const TimestampService: FrssElement = {
  definition,
  properties,
};

export default TimestampService;
