/* eslint-disable import/no-extraneous-dependencies */

// utility functions for determining the element type
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
} from 'tiny-svg';

import {
  ElementRenderType,
  type FrssRendererEntry,
  type RenderFunction,
} from '../../types/renderer';
import type { FrssCooperativenessType } from '../Cooperativeness/enumeration';

type CooperativenessPoolElement = {
  businessObject: {
    cooperativeness: FrssCooperativenessType | undefined,
  },
};

const renderFunction: RenderFunction = (
  { parentNode, element, bpmnRenderer },
) => {
  const cooperativenessElement: CooperativenessPoolElement = element;

  const evidenceContext = bpmnRenderer.handlers['bpmn:Participant'](
    parentNode,
    cooperativenessElement,
  );

  const getAttributes = () => {
    switch (cooperativenessElement.businessObject.cooperativeness) {
      case 'Cooperative': return {
        stroke: '#004200',
        fill: '#40ff40',
        'fill-opacity': 0.10,
      };
      case 'SemiCooperative': return {
        stroke: '#776f00',
        fill: '#fff01e',
        'fill-opacity': 0.10,
      };
      default: return {};
    }
  };

  attributesSvg(evidenceContext, getAttributes());
  return evidenceContext;
};

const evidenceContextRendererEntry: FrssRendererEntry = {
  renderFunction,
  shouldRender: (
    element: CooperativenessPoolElement,
  ) => is(element, 'bpmn:Participant')
       && (
         element.businessObject.cooperativeness === 'Cooperative'
        || element.businessObject.cooperativeness === 'SemiCooperative'
       ),
  type: ElementRenderType.Shape,
};

export default evidenceContextRendererEntry;
