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
} from 'tiny-svg';
import { ElementRenderType } from '../../types/renderer';

// icon for potential evidence sources
import EvidenceSourceIcon from './assets/evidence-source.png';

import evidenceSourceProperties from './properties';

// types
import type {
  FrssRendererEntry,
  RenderFunction,
} from '../../types/renderer';

const { offset } = evidenceSourceProperties;

const renderFunction: RenderFunction = (
  { parentNode, element },
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

const evidenceSourceRendererEntry: FrssRendererEntry = {
  renderFunction,
  shouldRender: (element) => is(element, evidenceSourceProperties.identifier),
  type: ElementRenderType.Shape,
};

export default evidenceSourceRendererEntry;
