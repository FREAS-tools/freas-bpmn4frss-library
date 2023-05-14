import hashProofProperties from '../../../../../Proof/HashProof/properties';
import isMarkedAsEvidenceDataObject from '../../../../common';
import MarkPotentialEvidenceAsProof from '../proof/markAsProof';
import type { PropertiesPanelEntry }
  from '../../../../../../types/controls/propertiesPanel';

const HashProofToggleSwitch = (props: { element: any }) => (
  MarkPotentialEvidenceAsProof({
    id: hashProofProperties.nameLowercase,
    identifier: hashProofProperties.identifier,
    element: props.element,
    moddlePropertyName: 'isHashProof',
    switcherLabelName: 'Hash Proof',
  })
);

const markAsHashProofEntry: PropertiesPanelEntry = {
  id: `mark-as-${hashProofProperties.nameLowercase}`,
  component: HashProofToggleSwitch,
  show: ({ element }) => {
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

export default markAsHashProofEntry;
