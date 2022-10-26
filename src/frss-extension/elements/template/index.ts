import { CustomElement } from '../types';
// import controls from './controls';
import definition, { xIdentifier } from './definition';
// import icon from './assets/x.png';
import properties from './properties';
// import render from './rendererEntry';

const element: CustomElement = {
  // controls,
  definition,
  // icon,
  identifier: xIdentifier,
  properties,
  // render,
};

/**
 * The default export exports all properties of a custom element.
 */
export default element;
