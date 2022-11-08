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
  append as appendSvg,
  attr as attributesSvg,
} from 'tiny-svg';
import RendererEntry from '../../types/rendererEntry';

// properties from the PotentialEvidence
import potentialEvidenceProperties from '../PotentialEvidence/properties';

const evidenceDataObjectRender: RendererEntry = (
  {
    parentNode,
    element,
    bpmnRenderer,
  },
) => {
  const isEvidenceDataObject = element
    .businessObject?.dataObjectRef?.potentialEvidenceType;
  console.log(isEvidenceDataObject);

  // we don't want to change the colour of label or the element
  // which is not marked as the potential evidence
  if (element.type === 'label'
      || !isEvidenceDataObject
      || !is(isEvidenceDataObject, potentialEvidenceProperties.identifier)) {
    return null;
  }

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

export default evidenceDataObjectRender;
