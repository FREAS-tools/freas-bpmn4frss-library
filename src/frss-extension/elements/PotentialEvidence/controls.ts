// @ts-expect-error
import { is, isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import { partitionArray } from '../../utility/partitionArray';
import evidenceAssociationProperties from '../EvidenceAssociation/properties';
import producesProperties from '../Produces/properties';

import type { Controls } from '../../types/controls';
import type { CreateActionHandler } from '../../types/controls/actionHandler';

const markDataObjectAsEvidence: CreateActionHandler = (
  {
    bpmnFactory,
    canvas,
    elementFactory,
    frssMultipleDiagramProvider,
    modeling,
  },
  elementProperties,
) => {
  const action = (_event: any, element: any) => {
    const dataObject = element?.businessObject?.dataObjectRef;
    if (dataObject.isPotentialEvidence !== undefined) return;

    // create a new `PotentialEvidence` object
    const potentialEvidence = bpmnFactory.create(
      elementProperties.identifier,
      { $parent: dataObject },
    );

    dataObject.isPotentialEvidence = potentialEvidence;
    modeling.updateProperties(element, {
      dataObjectRef: dataObject,
    });

    const evidenceDiagramHandle = frssMultipleDiagramProvider
      .getAssociatedEvidenceDiagram();

    const semanticDataObjectReference = bpmnFactory
      .create(
        'bpmn:DataObjectReference',
        {
          ...element.businessObject,
          id: `${element.businessObject.id as string}_EvidenceView`,
        },
      );

    semanticDataObjectReference.$parent = evidenceDiagramHandle
      .rootElement.parent;
    semanticDataObjectReference.dataObjectRef = dataObject;

    const diDataObjectReference = elementFactory.createShape(
      {
        businessObject: semanticDataObjectReference,
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
        parent: evidenceDiagramHandle.diPlane,
      },
    );

    canvas.addShape(diDataObjectReference, evidenceDiagramHandle.rootElement);2
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

    // filter out the FRSS associations we need to remove (desired)
    const { desired, rest } = partitionArray(
      // check both incoming and outgoing connections
      [...element.incoming, ...element.outgoing],
      // we target only `Produces` and `EvidenceAssociation` elements
      (elem: any) => isAny(
        elem,
        [
          producesProperties.identifier,
          evidenceAssociationProperties.identifier,
        ],
      ),
    );

    // remove incoming FRSS associations
    modeling.removeElements(
      desired,
    );

    // remove element
    modeling.removeElements(dataObject.isPotentialEvidence);
    delete dataObject.isPotentialEvidence;

    modeling.updateProperties(element, {
      dataObjectRef: dataObject,
      incoming: rest,
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
        title: 'Mark DataObject as Potential Evidence',
      },
      show: (element) => (
        is(element, 'bpmn:DataObjectReference')
        && !isMarked(element)
      ),
    },
    {
      makeActionHandler: unmarkDataObjectAsEvidence,
      props: {
        className: unmarkDataObjectAsEvidenceIdentifier,
        group: 'edit',
        key: unmarkDataObjectAsEvidenceIdentifier,
        title: 'Unmark DataObject as Potential Evidence',
      },
      show: (element) => (
        is(element, 'bpmn:DataObjectReference')
        && isMarked(element)
      ),
    },
  ],
};

export default controls;
