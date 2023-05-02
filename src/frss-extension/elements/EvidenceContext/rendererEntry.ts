/* eslint-disable import/no-extraneous-dependencies */

// utility functions for determining the element type
// @ts-expect-error
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
  append as appendSvg,
} from 'tiny-svg';

import {
  ElementRenderType,
  type RendererEntry,
  type RenderFunction,
} from '../../types/renderer';
import type { FrssCooperativenessType } from '../Cooperativeness/enumeration';

const renderFunction: RenderFunction = (
  { parentNode, element, bpmnRenderer },
) => {
  const evidenceContext = bpmnRenderer.handlers['bpmn:Participant'](
    parentNode,
    element,
  );

  const getColor = (elem: {
    businessObject: {
      cooperativeness: FrssCooperativenessType
    },
  }) => {
    switch (elem?.businessObject?.cooperativeness) {
      case 'Cooperative': return '#004200';
      case 'SemiCooperative': return '#b8ab00';
      case 'NonCooperative': return '#754c00';
      default: return '#fffff';
    }
  };

  console.log(getColor(element));

  const attributes = {
    stroke: getColor(element),
  };

  attributesSvg(evidenceContext, attributes);

  appendSvg(parentNode, evidenceContext);
  console.log(evidenceContext);
  return evidenceContext;
};

const rendererEntry: RendererEntry = {
  renderFunction,
  shouldRender: (element) => is(element, 'bpmn:Participant')
      && element?.businessObject?.cooperativeness !== undefined,
  type: ElementRenderType.Shape,
};

export default rendererEntry;
