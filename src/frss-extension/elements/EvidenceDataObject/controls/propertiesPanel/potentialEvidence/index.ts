// @ts-ignore
import { isTextAreaEntryEdited } from '@bpmn-io/properties-panel';
// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import isMarkedAsEvidenceDataObject from '../../common';
import PotentialEvidenceDataField from './potentialEvidenceDataField';
import ProofDataField from './proofDataField';
import type {
  PropertiesPanelData,
} from '../../../../../types/controls/propertiesPanel';

const potentialEvidenceGroup: PropertiesPanelData = {
  show: (element) => (
    is(element, 'bpmn:DataObjectReference')
    && isMarkedAsEvidenceDataObject(element)
  ),
  group: {
    id: 'potentialEvidence',
    label: 'Potential Evidence controls',
    entries: [
      {
        id: 'set-data-field',
        component: PotentialEvidenceDataField,
        show: (element: any) => {
          const potentialEvidence = (
            element.businessObject?.dataObjectRef?.isPotentialEvidence
          );

          return (isMarkedAsEvidenceDataObject(element)
          && potentialEvidence !== undefined
          && potentialEvidence.isHashProof === undefined
          && potentialEvidence.isTimestampProof === undefined);
        },
        isEdited: isTextAreaEntryEdited,
      },
      {
        id: 'set-data-field',
        component: ProofDataField,
        show: (element: any) => {
          const potentialEvidence = (
            element.businessObject?.dataObjectRef?.isPotentialEvidence
          );

          return (isMarkedAsEvidenceDataObject(element)
          && potentialEvidence !== undefined
          && (
            potentialEvidence.isHashProof !== undefined
            || potentialEvidence.isTimestampProof !== undefined
          )
          );
        },
        isEdited: isTextAreaEntryEdited,
      },
    ],
  },
};

export default potentialEvidenceGroup;
