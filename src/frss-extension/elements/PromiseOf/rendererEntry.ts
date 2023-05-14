/* eslint-disable import/no-extraneous-dependencies */

// utility functions for determining the element type
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
} from 'tiny-svg';

import { ElementRenderType } from '../../types/renderer';

import promiseOfProperties from './properties';

// types
import type {
  FrssRendererEntry,
  RenderFunction,
} from '../../types/renderer';

const renderFunction: RenderFunction = (
  { parentNode, element, bpmnRenderer },
) => {
  const promiseOf = (
    bpmnRenderer.handlers['bpmn:DataOutputAssociation'](
      parentNode,
      element,
    )
  );

  const attributes = {
    stroke: 'pink',
    strokeDasharray: '20, 5',
  };

  // set the attributes
  attributesSvg(promiseOf, attributes);

  return promiseOf;
};

const promiseOfRendererEntry: FrssRendererEntry = {
  renderFunction,
  shouldRender: (element) => (
    is(element, promiseOfProperties.identifier)
  ),
  type: ElementRenderType.Connection,
};

export default promiseOfRendererEntry;
