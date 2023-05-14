import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';

// types
import type { FrssElement } from '../../types';

/**
 * An Association between Evidence Source and Potential Evidence
 * (drawn by between Evidence Source and bpmn:DataObjectReference)
 */
const Produces: FrssElement = {
  definition,
  properties,
  rendererEntry,
};

export default Produces;
