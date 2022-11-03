import { FrssElement } from '../../types';
import controls from './controls';
import definition from './definition';
import properties from './properties';

// @TODO: decide whether to render the data objects differently
// we could inject the rendering and render the objects that
// have the evidence within them differently
// than regular dataObjects

// import render from './rendererEntry';

const evidenceDataObject: FrssElement = {
  controls,
  definition,
  properties,
  // render,
};

/**
 * The default export exports all properties of a custom element.
 */
export default evidenceDataObject;