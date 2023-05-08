/* eslint-disable import/no-extraneous-dependencies */

// utility functions for determining the element type
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
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
  const evidenceAssociation = (
    bpmnRenderer.handlers['bpmn:DataOutputAssociation'](
      parentNode,
      element,
    )
  );

  const attributes = {
    stroke: 'green',
    strokeDasharray: '20, 5',
  };

  // set the attributes
  attributesSvg(evidenceAssociation, attributes);

  return evidenceAssociation;
};

const evidenceAssociationRendererEntry: RendererEntry = {
  renderFunction,
  shouldRender: (element) => is(element, properties.identifier),
  type: ElementRenderType.Connection,
};

export default evidenceAssociationRendererEntry;
