/* eslint-disable import/no-extraneous-dependencies */
/**
 * Every element has a renderer entry file. This file contains all necessary
 * constants and functions for rendering the element. The constants
 * are used for identifying the element by renderers, the functions are used
 * for displaying the element on the canvas.
 */

// rendering tools from tiny-svg
import {
  create as createSvg,
  append as appendSvg,
} from 'tiny-svg';
import { ELEMENT_FALLBACK_OFFSET } from '../../common';

// // [OPTIONAL] icon for potential evidence sources
// import xIcon from './assets/x.png';

import properties from './properties';

const offset = properties.elementOffset ?? ELEMENT_FALLBACK_OFFSET;

const xRender = (
  parentNode: any,
  element: any
) => {
  const x = createSvg('', {
    // position - defined by the offset
    ...offset,
  });

  appendSvg(parentNode, x as SVGAElement);

  return x;
};

export default xRender;
