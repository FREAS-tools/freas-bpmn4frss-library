// @ts-ignore
import { is, isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import { partitionArray } from '../../../utility/partitionArray';
import evidenceAssociationProperties
  from '../../EvidenceAssociation/properties';
import potentialEvidenceProperties from '../../PotentialEvidence/properties';
import producesProperties from '../../Produces/properties';
import isMarkedAsEvidenceDataObject from './common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';

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

    // update the object properties
    modeling.updateProperties(element, {
      dataObjectRef: dataObject,
      incoming: rest,
    });
  };

  return action;
};

const unmarkDataObjectAsEvidenceEntry: PadEntryData = {
  makeActionHandler: unmarkDataObjectAsEvidence,
  props: {
    className: 'unmark',
    group: 'edit',
    key: `unmark-${potentialEvidenceProperties.nameLowercase}`,
    title: 'Unmark DataObject as Potential Evidence',
  },
  show: (element) => (
    is(element, 'bpmn:DataObjectReference')
    && element.type !== 'label'
    && isMarkedAsEvidenceDataObject(element)
  ),
};

export default unmarkDataObjectAsEvidenceEntry;
