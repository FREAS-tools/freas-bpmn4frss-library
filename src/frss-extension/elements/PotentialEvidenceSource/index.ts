import { CustomElement } from '../types';
import icon
  from './assets/potential-evidence-source.png';
import controls from './controls';
import definition,
{ potentialEvidenceSourceIdentifier as identifier } from './definition';
import name from './properties';
import render from './rendererEntry';

const potentialEvidenceSource: CustomElement = {
  controls,
  definition,
  icon,
  identifier,
  name,
  render,
};

export { name };

/**
 * The default export exports all properties of a custom element.
 */
export default potentialEvidenceSource;
