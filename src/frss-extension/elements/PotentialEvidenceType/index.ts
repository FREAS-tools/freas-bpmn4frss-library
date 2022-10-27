import { CustomElement } from '../types';
// import controls from './controls';
import definition, { potentialEvidenceTypeIdentifier } from './definition';
// import icon from './assets/x.png';
import properties from './properties';
// import render from './rendererEntry';

const potentialEvidenceType: CustomElement = {
  // controls,
  definition,
  // icon,
  identifier: potentialEvidenceTypeIdentifier,
  properties,
  // render,
};

/**
 * The default export exports all properties of a custom element.
 */
export default potentialEvidenceType;
