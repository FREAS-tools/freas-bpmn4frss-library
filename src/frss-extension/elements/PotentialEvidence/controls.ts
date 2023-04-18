/* @ts-ignore */
import { isAny, is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import producesProperties from '../Produces/properties';

import type { Controls } from '../../types/controls';
import type { CreateActionHandler } from '../../types/controls/actionHandler';

const markDataObjectAsEvidence: CreateActionHandler = (
  {
    bpmnFactory,
    modeling,
  },
  elementProperties,
) => {
  const action = (_event: any, element: any) => {
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

const unmarkDataObjectAsEvidence: CreateActionHandler = (
  {
    modeling,
  },
  _elementProperties,
) => {
  const action = (_event: any, element: any) => {
    const dataObject = element?.businessObject?.dataObjectRef;
    if (!dataObject.isPotentialEvidence) return;

    const incomingProducesElements = element.incoming
      .filter((elem: any) => is(elem, producesProperties.identifier));
    const incomingElementsRest = element.incoming
      .filter((elem: any) => !is(elem, producesProperties.identifier));

    // remove incoming `Produces` associations
    modeling.removeElements(
      incomingProducesElements,
    );

    // remove element
    modeling.removeElements([dataObject.isPotentialEvidence]);
    delete dataObject.isPotentialEvidence;

    modeling.updateProperties(element, {
      dataObjectRef: dataObject,
      incoming: incomingElementsRest,
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
      makeActionHandler: markDataObjectAsEvidence,
      props: {
        className: markDataObjectAsEvidenceIdentifier,
        group: 'edit',
        key: markDataObjectAsEvidenceIdentifier,
        title: 'Mark DataObjectRef as Potential Evidence',
      },
      show: (element) => (isAny(element, ['bpmn:DataObjectReference'])
        && !isMarked(element)),
    },
    {
      makeActionHandler: unmarkDataObjectAsEvidence,
      props: {
        className: unmarkDataObjectAsEvidenceIdentifier,
        group: 'edit',
        key: unmarkDataObjectAsEvidenceIdentifier,
        title: 'Unmark DataObjectRef as Potential Evidence',
      },
      show: (element) => (isAny(element, ['bpmn:DataObjectReference'])
        && isMarked(element)),
    },
  ],
};

export default controls;
