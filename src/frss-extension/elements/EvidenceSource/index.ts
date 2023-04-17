import FrssElement from '../../types';
import controls from './controls';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';
// import rules from './rules';

const evidenceSource: FrssElement = {
  controls,
  definition,
  properties,
  rendererEntry,
  // rules,
};

/**
 * The default export exports all properties of a custom element.
 */
export default evidenceSource;
