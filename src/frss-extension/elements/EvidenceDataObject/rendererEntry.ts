/* eslint-disable import/no-extraneous-dependencies */
/**
 * Every element has a renderer entry file. This file contains all necessary
 * constants and functions for rendering the element. The constants
 * are used for identifying the element by renderers, the functions are used
 * for displaying the element on the canvas.
 */

// bpmn-js helper function for determining element type
// @ts-expect-error
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  append as appendSvg,
  attr as attributesSvg,
} from 'tiny-svg';

import { ElementRenderType } from '../../types/renderer';

// properties from the PotentialEvidence
import potentialEvidenceProperties from '../PotentialEvidence/properties';

// types
import type {
  RendererEntry,
  RenderFunction,
  ShouldRender,
} from '../../types/renderer';

const dataObjectElementIdentifier = 'bpmn:DataObjectReference';

const shouldRender: ShouldRender = (element) => {
  const evidenceDataObject = element
    .businessObject?.dataObjectRef?.isPotentialEvidence;

  // we want to change only those `DataObjectReference`s that are
  // our desired type (are potentialEvidence)
  return (
    is(element, dataObjectElementIdentifier)
    && element.type !== 'label'
    && evidenceDataObject !== undefined
    && is(evidenceDataObject, potentialEvidenceProperties.identifier)
  );
};

export const renderFunction: RenderFunction = (
  {
    parentNode,
    element,
    bpmnRenderer,
  },
) => {
  // get the default handler for `DataObjectReference`. We want to change
  // the attributes of the SVG
  const potentialEvidence = bpmnRenderer
    .handlers['bpmn:DataObjectReference'](parentNode, element);
  const attributes = {
    stroke: 'green',
    strokeWidth: 2,
    fill: 'white',
  };

  // propagate the attributes to the rendered item
  attributesSvg(potentialEvidence, attributes);

  // append that version of the SVG to the html node
  appendSvg(parentNode, potentialEvidence);

  // return the element
  return potentialEvidence;
};

const evidenceDataObjectRendererEntry: RendererEntry = {
  renderFunction,
  shouldRender,
  type: ElementRenderType.Shape,
};

export default evidenceDataObjectRendererEntry;
