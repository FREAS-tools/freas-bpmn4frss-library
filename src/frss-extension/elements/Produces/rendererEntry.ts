/* eslint-disable import/no-extraneous-dependencies */

// utility functions for determining the element type
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
  append as appendSvg,
} from 'tiny-svg';
import ElementRender, {
  ElementRenderType,
  RenderFunction,
} from '../../types/renderer/rendererEntry';
import properties from './properties';

const { identifier } = properties;

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

const rendererEntry: ElementRender = {
  renderOnElements: [identifier],
  renderFunction,
  shouldRender: (element) => is(element, identifier),
  type: ElementRenderType.Connection,
};

export default rendererEntry;
