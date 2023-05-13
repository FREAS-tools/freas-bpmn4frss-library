/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
} from 'tiny-svg';

import { ElementRenderType } from '../../types/renderer';

// types
import type {
  FrssRendererEntry,
  RenderFunction,
  ShouldRender,
} from '../../types/renderer';
import type { BooleanEnumerationType } from '../BooleanEnumeration/enumeration';

const shouldRender: ShouldRender = (element) => {
  const evidenceStore: BooleanEnumerationType | undefined = (
    element.businessObject?.isEvidenceStore
  );
  return is(element, 'bpmn:DataStoreReference')
    && element.type !== 'label'
    && evidenceStore === 'true';
};

export const renderFunction: RenderFunction = ({
  parentNode,
  element,
  bpmnRenderer,
}) => {
  // get the default handler for `DataStoreReference`. We want to change
  // the attributes of the SVG
  const evidenceStore = bpmnRenderer
    .handlers['bpmn:DataStoreReference'](parentNode, element);
  const attributes = {
    stroke: 'green',
    strokeWidth: 2,
    fill: 'white',
  };

  attributesSvg(evidenceStore, attributes);

  return evidenceStore;
};

const evidenceStoreRendererEntry: FrssRendererEntry = {
  renderFunction,
  shouldRender,
  type: ElementRenderType.Shape,
};

export default evidenceStoreRendererEntry;
