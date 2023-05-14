// @ts-ignore
import { isTextAreaEntryEdited } from '@bpmn-io/properties-panel';

import isMarkedAsEvidenceDataObject from '../../../common';
import bcTimestampProofEntries from './bcTimestampProof';
import PotentialEvidenceDataField from './dataField/potentialEvidenceDataField';
import ProofDataField from './dataField/proofDataField';
import markAsHashProofEntry from './hashProof/markAsHashProof';
import markAsPKITimestampProofEntry from './pkiTimestampProof';
import type {
  PropertiesPanelData,
} from '../../../../../types/controls/propertiesPanel';

export const potentialEvidenceGroup: PropertiesPanelData = {
  show: (element: any) => {
    const potentialEvidence = (
      element.businessObject?.dataObjectRef?.isPotentialEvidence
    );

    return (
      isMarkedAsEvidenceDataObject(element)
      && potentialEvidence !== undefined
      && potentialEvidence.isHashProof === undefined
      && potentialEvidence.isTimestampProof === undefined
    );
  },
  group: {
    id: 'potentialEvidence',
    label: 'Potential Evidence controls',
    entries: [
      {
        id: 'set-data-field',
        component: PotentialEvidenceDataField,
        show: (_context) => true,
        isEdited: isTextAreaEntryEdited,
      },
      // hash entry when the potential evidence can be marked as hash proof
      markAsHashProofEntry,
      // bc timestamp entries when the potential evidence can be marked
      // as either bc timestamp
      ...bcTimestampProofEntries,
      // pki timestamp entries when the potential evidence can be marked as
      // a pki timestamp
      markAsPKITimestampProofEntry,
    ],
  },
};

export const proofGroup: PropertiesPanelData = {
  show: (element: any) => {
    const potentialEvidence = (
      element.businessObject?.dataObjectRef?.isPotentialEvidence
    );

    return (isMarkedAsEvidenceDataObject(element)
    && potentialEvidence !== undefined
    && (
      potentialEvidence.isHashProof !== undefined
      || potentialEvidence.isTimestampProof !== undefined)
    );
  },
  group: {
    id: 'proof',
    label: 'Proof controls',
    entries: [
      {
        id: 'set-data-field',
        component: ProofDataField,
        show: (_context) => true,
        isEdited: isTextAreaEntryEdited,
      },
      // hash entry when the potential evidence can be marked as hash proof
      markAsHashProofEntry,
      // bc timestamp entries when the potential evidence can be marked
      // as either bc timestamp
      ...bcTimestampProofEntries,
      // pki timestamp entries when the potential evidence can be marked as
      // a pki timestamp
      markAsPKITimestampProofEntry,
    ],
  },
};
