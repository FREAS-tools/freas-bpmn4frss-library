/* eslint-disable import/no-extraneous-dependencies */

// utility functions for determining the element type
// @ts-expect-error
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
  append as appendSvg,
} from 'tiny-svg';

import { ElementRenderType } from '../../types/renderer';

import properties from './properties';

// types
import type {
  RendererEntry,
  RenderFunction,
} from '../../types/renderer';

const renderFunction: RenderFunction = (
  { parentNode, element, bpmnRenderer },
) => {
  const produces = bpmnRenderer.handlers['bpmn:DataOutputAssociation'](
    parentNode,
    element,
  );

  const attributes = {
    stroke: 'green',
  };

  // set the attributes
  attributesSvg(produces, attributes);

  // append the svg
  appendSvg(parentNode, produces);
  return produces;
};

const rendererEntry: RendererEntry = {
  renderFunction,
  shouldRender: (element) => is(element, properties.identifier),
  type: ElementRenderType.Connection,
};

export default rendererEntry;
