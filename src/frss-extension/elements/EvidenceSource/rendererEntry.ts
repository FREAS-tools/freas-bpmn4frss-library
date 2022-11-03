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

// icon for potential evidence sources
import EvidenceSourceIcon
  from './assets/evidence-source.png';

import properties from './properties';

const offset = properties.elementOffset ?? ELEMENT_FALLBACK_OFFSET;

/**
 * Every custom element that is visible has to have a way to render itself,
 * so in every `rendererEntry.ts` file is a function that does just that -
 * provides a way to render the element.
 *
 * @param {*} parentNode parent node of the element that needs to be rendered
 * @param {*} element element that is getting rendered
 *
 * @returns rendered element
 */
const evidenceSourceRender = (
  parentNode: any,
  element: any,
) => {
  // render the image into the modeler
  const evidenceSource = createSvg('image', {
    // position - defined by the offset
    ...offset,

    // size
    width: element.width,
    height: element.height,

    // content
    href: EvidenceSourceIcon,
  });

  // append the image to the SVG
  appendSvg(parentNode, evidenceSource as SVGElement);

  // return the element
  return evidenceSource;
};

export default evidenceSourceRender;
