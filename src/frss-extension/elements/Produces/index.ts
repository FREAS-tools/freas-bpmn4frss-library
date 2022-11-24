import FrssElement from '../../types';
import definition from './definition';
import properties from './properties';
import rules from './rules';

const produces: FrssElement = {
  // controls,
  definition,
  // icon,
  properties,
  // render,
  rules,
};

/**
 * The default export exports all properties of a custom element.
 */
export default produces;
