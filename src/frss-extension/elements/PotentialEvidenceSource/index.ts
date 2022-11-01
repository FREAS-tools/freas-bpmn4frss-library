import { CustomElement } from '../types';
import icon
  from './assets/potential-evidence-source.png';
import controls from './controls';
import definition from './definition';
import properties from './properties';
import render from './rendererEntry';

const potentialEvidenceSource: CustomElement = {
  controls,
  definition,
  icon,
  properties,
  render,
};

/**
 * The default export exports all properties of a custom element.
 */
export default potentialEvidenceSource;
