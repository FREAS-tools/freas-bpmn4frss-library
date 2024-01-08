/* eslint-disable import/no-extraneous-dependencies */
/**
 * Every element has a renderer entry file. This file contains all necessary
 * constants and functions for rendering the element. The constants
 * are used for identifying the element by renderers, the functions are used
 * for displaying the element on the canvas.
 */

// utility functions for determining the element type
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  create as createSvg,
  append as appendSvg,
  innerSVG as innerSvg,
} from 'tiny-svg';
import { ElementRenderType } from '../../types/renderer';

// icon for potential evidence sources
import EvidenceSourceIcon from './assets/evidence-source.min.svg';

import evidenceSourceProperties from './properties';

// types
import type {
  FrssRendererEntry,
  RenderFunction,
} from '../../types/renderer';

const { offset } = evidenceSourceProperties;

// Get the SVG icon, so it can be injected
const EvidenceSourceIconRaw = (() => {
  const request = new XMLHttpRequest();
  request.open('GET', EvidenceSourceIcon, false); // `false` makes the request synchronous
  request.send(null);
  return request.responseText;
})();

const renderFunction: RenderFunction = (
  { parentNode, element },
) => {
  // create the rendered image container
  const evidenceSource = createSvg('svg', {
    // position - defined by the offset
    ...offset,

    // size
    width: element.width,
    height: element.height,

    // viewbox depend on the imported svg
    viewBox: '0 0 50 50',
  });

  // set the content
  innerSvg(evidenceSource, EvidenceSourceIconRaw);

  // append the image to the parent
  appendSvg(parentNode, evidenceSource as SVGElement);

  // return the element
  return evidenceSource;
};

const evidenceSourceRendererEntry: FrssRendererEntry = {
  renderFunction,
  shouldRender: (element) => is(element, evidenceSourceProperties.identifier),
  type: ElementRenderType.Shape,
};

export default evidenceSourceRendererEntry;
