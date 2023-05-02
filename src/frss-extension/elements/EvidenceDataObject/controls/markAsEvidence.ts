// @ts-expect-error
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import potentialEvidenceProperties from '../../PotentialEvidence/properties';
import isMarked from './common';
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
    modeling.updateProperties(element, {
      dataObjectRef: dataObject,
    });
  }
);

const markDataObjectAsEvidenceEntry: PadEntryData = {
  makeActionHandler: markDataObjectAsEvidence,
  props: {
    className: (
      `mark-as mark-as--${potentialEvidenceProperties.nameLowercase}`
    ),
    group: 'edit',
    key: `mark-as-${potentialEvidenceProperties.nameLowercase}`,
    title: 'Mark DataObject as Potential Evidence',
  },
  show: (element) => (
    is(element, 'bpmn:DataObjectReference')
    && element.type !== 'label'
    && !isMarked(element)
  ),
};

export default markDataObjectAsEvidenceEntry;
