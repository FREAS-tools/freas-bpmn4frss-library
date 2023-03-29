/* @ts-ignore */
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import { NewActionFunction } from '../../types/controls/actionFunction';
import { Controls } from '../../types/controls/controls';

const markDataObjectAsEvidence: NewActionFunction = (
  {
    bpmnFactory,
    modeling,
  },
  elementProperties,
) => {
  const action = (event: any, element: any) => {
    const dataObject = element?.businessObject?.dataObjectRef;
    if (dataObject.isPotentialEvidence) return;

    const potentialEvidence = bpmnFactory.create(elementProperties.identifier);

    dataObject.isPotentialEvidence = potentialEvidence;
    modeling.updateProperties(element, {
      dataObjectRef: dataObject,
    });
  };

  return action;
};

const unmarkDataObjectAsEvidence: NewActionFunction = (
  {
    modeling,
  },
  _elementProperties,
) => {
  const action = (event: any, element: any) => {
    const dataObject = element?.businessObject?.dataObjectRef;
    if (!dataObject.isPotentialEvidence) return;

    modeling.removeElements([dataObject.isPotentialEvidence]);
    delete dataObject.isPotentialEvidence;
    modeling.updateProperties(element, {
      dataObjectRef: dataObject,
    });
  };

  return action;
};

const markDataObjectAsEvidenceIdentifier = 'mark-as-potential-evidence';
const unmarkDataObjectAsEvidenceIdentifier = (
  `un${markDataObjectAsEvidenceIdentifier}`
);

const isMarked = (element: any): boolean => (
  element?.businessObject?.dataObjectRef?.isPotentialEvidence !== undefined
);

const controls: Controls = {
  padEntries: [
    {
      action: markDataObjectAsEvidence,
      entryProps: {
        className: markDataObjectAsEvidenceIdentifier,
        entryGroup: 'edit',
        key: markDataObjectAsEvidenceIdentifier,
        title: 'Mark DataObjectRef as Potential Evidence',
      },
      show: (element) => (isAny(element, ['bpmn:DataObjectReference'])
        && !isMarked(element)),
    },
    {
      action: unmarkDataObjectAsEvidence,
      entryProps: {
        className: unmarkDataObjectAsEvidenceIdentifier,
        entryGroup: 'edit',
        key: unmarkDataObjectAsEvidenceIdentifier,
        title: 'Unmark DataObjectRef as Potential Evidence',
      },
      show: (element) => (isAny(element, ['bpmn:DataObjectReference'])
        && isMarked(element)),
    },
  ],
};

export default controls;
