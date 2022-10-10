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

// import the prefix
import { bpmn4frssPrefix } from '../../common';

// icon for potential evidence sources
import PotentialEvidenceSourceIcon
  from './assets/potential-evidence-source.png';

// offset of the element
const ELEMENT_OFFSET = {
  x: 0,
  y: 0,
};

/**
 * This is the string identifier for the PotentialEvidenceSource element.
 * Each custom renderable construct has its own identifier, which is used
 * to distinguish the element from the default elements
 *
 * Pattern:
 *
 * variable name -> CustomElementName+Identifier
 *
 * content -> prefix:CustomElementName
 *
 * Example:
 *
 * ```javascript
 * export const PotentialEvidenceSourceElement = `${bpmn4frssPrefix}PotentialEvidenceSource`;
 * ```
 */
export const potentialEvidenceSourceIdentifier = (
  `${bpmn4frssPrefix}PotentialEvidenceSource`);

/**
 * Every custom element that is visible has to have a way to render itself,
 * so in every `rendererEntry.js` file is a function that does just that -
 * provides a way to render the element.
 *
 * @param {*} parentNode parent node of the element that needs to be rendered
 * @param {*} element element that is getting rendered
 *
 * @returns rendered element
 */
export const potentialEvidenceSourceRender = (
  parentNode: any,
  element: any,
) => {
  // render the image into the modeler
  const potentialEvidenceSource = createSvg('image', {
    // position
    x: ELEMENT_OFFSET.x,
    y: ELEMENT_OFFSET.y,

    // size
    width: element.width,
    height: element.height,

    // content
    href: PotentialEvidenceSourceIcon,
  });

  // append the image to the SVG
  appendSvg(parentNode, potentialEvidenceSource as SVGElement);

  // return the element
  return potentialEvidenceSource;
};
