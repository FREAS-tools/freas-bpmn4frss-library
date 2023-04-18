// element module
import controls from './controls';
import definition from './definition';
import properties from './properties';

// types
import type { FrssElement } from '../../types';

const potentialEvidence: FrssElement = {
  controls,
  definition,
  properties,
};

/**
 * The default export exports all properties of a custom element.
 */
export default potentialEvidence;
