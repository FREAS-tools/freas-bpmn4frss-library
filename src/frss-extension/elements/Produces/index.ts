import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';

// types
import type { FrssElement } from '../../types';

const Produces: FrssElement = {
  definition,
  properties,
  rendererEntry,
};

/**
 * The default export exports all properties of a custom element.
 */
export default Produces;
