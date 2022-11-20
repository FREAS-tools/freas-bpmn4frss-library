import FrssElement from '../../types';
import controls from './controls';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';

const evidenceSource: FrssElement = {
  controls,
  definition,
  properties,
  rendererEntry,
};

/**
 * The default export exports all properties of a custom element.
 */
export default evidenceSource;
