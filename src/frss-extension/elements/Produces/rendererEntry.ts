/* eslint-disable import/no-extraneous-dependencies */

// utility functions for determining the element type
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
} from 'tiny-svg';

import { ElementRenderType } from '../../types/renderer';

import producesProperties from './properties';

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

  return produces;
};

const producesRendererEntry: RendererEntry = {
  renderFunction,
  shouldRender: (element) => is(element, producesProperties.identifier),
  type: ElementRenderType.Connection,
};

export default producesRendererEntry;
