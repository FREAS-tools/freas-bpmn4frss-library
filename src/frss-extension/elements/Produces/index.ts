import { CustomElement } from '../types';
// import controls from './controls';
import definition, { producesIdentifier } from './definition';
import properties from './properties';
// import icon from './assets/x.png';
// import render from './rendererEntry';

const produces: CustomElement = {
  // controls,
  definition,
  // icon,
  identifier: producesIdentifier,
  properties,
  // render,
};

/**
 * The default export exports all properties of a custom element.
 */
export default produces;
