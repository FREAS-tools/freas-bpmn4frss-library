/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

// rendering tools from tiny-svg
import {
  attr as attributesSvg,
} from 'tiny-svg';

import { ElementRenderType } from '../../types/renderer';

// properties from the EvidenceStore
import evidenceStoreProperties from '../EvidenceStore/properties';

// types
import type {
  FrssRendererEntry,
  RenderFunction,
  ShouldRender,
} from '../../types/renderer';

const dataObjectElementIdentifier = 'bpmn:DataStoreReference';

const shouldRender: ShouldRender = (element) => {
  const evidenceDataStore = element
    .businessObject?.dataStoreRef?.isEvidenceStore;

  return (
    is(element, dataObjectElementIdentifier)
    && element.type !== 'label'
    && evidenceDataStore !== undefined
    && is(evidenceDataStore, evidenceStoreProperties.identifier)
  );
};

export const renderFunction: RenderFunction = ({
  parentNode,
  element,
  bpmnRenderer,
}) => {
  // get the default handler for `DataStoreReference`. We want to change
  // the attributes of the SVG
  const evidenceDataStore = bpmnRenderer
    .handlers['bpmn:DataStoreReference'](parentNode, element);
  const attributes = {
    stroke: 'green',
    strokeWidth: 2,
    fill: 'white',
  };

  attributesSvg(evidenceDataStore, attributes);

  return evidenceDataStore;
};

const evidenceDataStoreRendererEntry: FrssRendererEntry = {
  renderFunction,
  shouldRender,
  type: ElementRenderType.Shape,
};

export default evidenceDataStoreRendererEntry;
