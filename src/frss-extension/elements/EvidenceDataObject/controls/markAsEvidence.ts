// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import potentialEvidenceProperties from '../../PotentialEvidence/properties';
import isMarkedAsEvidenceDataObject from './common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';

const markDataObjectAsEvidence: CreateActionHandler = (
  {
    bpmnFactory,
    modeling,
  },
  _elementProperties,
) => (
  (_event: any, element: any) => {
    const dataObject = element?.businessObject?.dataObjectRef;
    if (dataObject.isPotentialEvidence !== undefined) return;

    // create a new `PotentialEvidence` object
    const potentialEvidence = bpmnFactory.create(
      potentialEvidenceProperties.identifier,
    );

    // update properties of objects
    dataObject.isPotentialEvidence = potentialEvidence;
    potentialEvidence.$parent = dataObject;
    modeling.updateProperties(element, {
      dataObjectRef: dataObject,
    });
  }
);

const markDataObjectAsEvidenceEntry: PadEntryData = {
  makeActionHandler: markDataObjectAsEvidence,
  props: {
    className: (
      'mark-as mark-as--default'
    ),
    group: 'edit',
    key: `mark-as-${potentialEvidenceProperties.nameLowercase}`,
    title: 'Mark Data Object as Potential Evidence',
  },
  show: (element) => (
    is(element, 'bpmn:DataObjectReference')
    && element.type !== 'label'
    && !isMarkedAsEvidenceDataObject(element)
  ),
};

export default markDataObjectAsEvidenceEntry;
