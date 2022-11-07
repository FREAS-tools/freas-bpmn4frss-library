import FrssElement from '../../types';
import controls from './controls';
import definition from './definition';
import properties from './properties';
import render from './rendererEntry';

const evidenceSource: FrssElement = {
  controls,
  definition,
  properties,
  render,
};

/**
 * The default export exports all properties of a custom element.
 */
export default evidenceSource;
