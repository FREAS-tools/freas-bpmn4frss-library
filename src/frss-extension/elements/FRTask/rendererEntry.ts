/* eslint-disable import/no-extraneous-dependencies */
/**
 * Every element has a renderer entry file. This file contains all necessary
 * constants and functions for rendering the element. The constants
 * are used for identifying the element by renderers, the functions are used
 * for displaying the element on the canvas.
 */

// bpmn-js helper function for determining element type
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
} from 'tiny-svg';

import { ElementRenderType } from '../../types/renderer';

// properties from the frTask
import frTaskProperties from './properties';

// types
import type {
  FrssRendererEntry,
  RenderFunction,
  ShouldRender,
} from '../../types/renderer';

const shouldRender: ShouldRender = (element) => {
  const { businessObject } = element;

  // we want to render the element when it is marked as some FRTask
  return (
    is(element, frTaskProperties.identifier)
    && element.type !== 'label'
    && (
      businessObject.isAuthenticityComputation !== undefined
      || businessObject.isIntegrityComputation !== undefined
      || businessObject.isDataTransformation !== undefined
    )
  );
};

export const renderFunction: RenderFunction = (
  {
    parentNode,
    element,
    bpmnRenderer,
  },
) => {
  // get the default handler for `bpmn:Task`. We just want to change
  // the attributes of the SVG
  const frTask = bpmnRenderer
    .handlers['bpmn:Task'](parentNode, element);
  const attributes = {
    stroke: 'green',
  };

  // propagate the attributes to the rendered item
  attributesSvg(frTask, attributes);

  // return the element
  return frTask;
};

const frTaskRendererEntry: FrssRendererEntry = {
  renderFunction,
  shouldRender,
  type: ElementRenderType.Shape,
};

export default frTaskRendererEntry;
