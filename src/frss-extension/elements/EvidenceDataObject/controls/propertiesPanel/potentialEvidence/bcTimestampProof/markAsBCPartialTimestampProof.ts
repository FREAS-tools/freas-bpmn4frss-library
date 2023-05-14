import bcTimestampPartialProofProperties
  from
  '../../../../../Proof/TimestampProof/BCTimestampPartialProof/properties';
import MarkPotentialEvidenceAsProof from '../proof/markAsProof';
import differentiateBCTimestamp from './markAsBcTimestampProof';
import type { PropertiesPanelEntry }
  from '../../../../../../types/controls/propertiesPanel';

const MarkAsBCPartialTimestampProofToggleSwitch = (props: { element: any }) => (
  MarkPotentialEvidenceAsProof({
    id: bcTimestampPartialProofProperties.nameLowercase,
    identifier: bcTimestampPartialProofProperties.identifier,
    element: props.element,
    moddlePropertyName: 'isTimestampProof',
    switcherLabelName: 'BC Timestamp - Partial Proof',
  })
);

const markAsBCPartialTimestampProofEntry: PropertiesPanelEntry = {
  id: `mark-as-${bcTimestampPartialProofProperties.nameLowercase}`,
  component: MarkAsBCPartialTimestampProofToggleSwitch,
  show: (context) => (
    differentiateBCTimestamp(
      context,
      bcTimestampPartialProofProperties.identifier,
    )
  ),
};

export default markAsBCPartialTimestampProofEntry;
