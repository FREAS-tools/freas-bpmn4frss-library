import FrssElement from '../../types';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';
import rules from './rules';

const produces: FrssElement = {
  definition,
  properties,
  rendererEntry,
  rules,
};

/**
 * The default export exports all properties of a custom element.
 */
export default produces;
