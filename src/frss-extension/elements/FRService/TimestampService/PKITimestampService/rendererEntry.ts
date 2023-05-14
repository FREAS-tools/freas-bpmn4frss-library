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
} from '../../../../types/renderer';
import pkiTimestampServiceProperties from './properties';

const renderFunction: RenderFunction = ({
  parentNode, element, bpmnRenderer,
}) => {
  const pkiTimestampService = (
    bpmnRenderer.handlers['bpmn:Participant'](
      parentNode,
      element,
    )
  );

  const attributes = {
    stroke: 'green',
  };

  attributesSvg(pkiTimestampService, attributes);

  return pkiTimestampService;
};

const pkiTimestampServiceRendererEntry: FrssRendererEntry = {
  renderFunction,
  shouldRender: (element) => (
    is(element, pkiTimestampServiceProperties.identifier)
  ),
  type: ElementRenderType.Shape,
};

export default pkiTimestampServiceRendererEntry;
