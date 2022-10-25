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

// offset of the element
// DELETE THIS IF THE ELEMENT IS A META OBJECT
const ELEMENT_OFFSET = {
  x: 0,
  y: 0,
};

export const xIdentifier = (
  `${bpmn4frssPrefix}x`);

/**
 * Every custom element that is visible has to have a way to render itself,
 * so in every `rendererEntry.ts` file is a function that does just that -
 * provides a way to render the element.
 *
 * @param {*} parentNode parent node of the element that needs to be rendered
 * @param {*} element element that is getting rendered
 *
 * @returns rendered element or null if the element should not be rendered
 */
export const xRender = (
  parentNode: any,
  element: any,
): null => null;
