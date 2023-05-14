// @ts-ignore
import { isTextAreaEntryEdited } from '@bpmn-io/properties-panel';
import isMarkedAsEvidenceDataObject from '../../common';
import HashProofToggleSwitch from './markAsHashProof';
import PotentialEvidenceDataField from './potentialEvidenceDataField';
import ProofDataField from './proofDataField';
import type {
  PropertiesPanelData, PropertiesPanelEntry,
} from '../../../../../types/controls/propertiesPanel';

const markAsHashProofEntry: PropertiesPanelEntry = {
  id: 'mark-as-hash-proof',
  component: HashProofToggleSwitch,
  show: (element) => {
    const potentialEvidence = (
      element.businessObject?.dataObjectRef?.isPotentialEvidence
    );

    return (
      isMarkedAsEvidenceDataObject(element)
      && potentialEvidence !== undefined
      && element?.incoming?.find(
        (association: any) => {
          const integrityComputation = (
            association
              ?.source
              ?.businessObject
              ?.isIntegrityComputation
          );

          return integrityComputation !== undefined
          && integrityComputation?.output?.id === association.id;
        },
      )
    );
  },
};

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
        show: (_element: any) => true,
        isEdited: isTextAreaEntryEdited,
      },
      markAsHashProofEntry,
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
        show: (_element: any) => true,
        isEdited: isTextAreaEntryEdited,
      },
      markAsHashProofEntry,
    ],
  },
};
