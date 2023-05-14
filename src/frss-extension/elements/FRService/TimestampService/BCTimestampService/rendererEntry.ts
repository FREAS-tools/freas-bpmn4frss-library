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
import bcTimestampServiceProperties from './properties';

const renderFunction: RenderFunction = ({
  parentNode, element, bpmnRenderer,
}) => {
  const bcTimestampService = (
    bpmnRenderer.handlers['bpmn:Participant'](
      parentNode,
      element,
    )
  );

  const attributes = {
    stroke: 'green',
  };

  attributesSvg(bcTimestampService, attributes);

  return bcTimestampService;
};

const bcTimestampServiceRendererEntry: FrssRendererEntry = {
  renderFunction,
  shouldRender: (element) => (
    is(element, bcTimestampServiceProperties.identifier)
  ),
  type: ElementRenderType.Shape,
};

export default bcTimestampServiceRendererEntry;
