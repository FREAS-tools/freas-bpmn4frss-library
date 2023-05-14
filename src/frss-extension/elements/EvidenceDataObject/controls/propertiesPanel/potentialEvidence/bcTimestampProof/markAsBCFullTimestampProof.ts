import bcTimestampFullProofProperties
  from '../../../../../Proof/TimestampProof/BCTimestampFullProof/properties';
import MarkPotentialEvidenceAsProof from '../proof/markAsProof';
import differentiateBCTimestamp from './markAsBcTimestampProof';
import type { PropertiesPanelEntry }
  from '../../../../../../types/controls/propertiesPanel';

const MarkAsBCFullTimestampProofToggleSwitch = (props: { element: any }) => (
  MarkPotentialEvidenceAsProof({
    id: bcTimestampFullProofProperties.nameLowercase,
    identifier: bcTimestampFullProofProperties.identifier,
    element: props.element,
    moddlePropertyName: 'isTimestampProof',
    switcherLabelName: 'BC Timestamp - Full Proof',
  })
);

const markAsBCFullTimestampProofEntry: PropertiesPanelEntry = {
  id: `mark-as-${bcTimestampFullProofProperties.nameLowercase}`,
  component: MarkAsBCFullTimestampProofToggleSwitch,
  show: (context) => (
    differentiateBCTimestamp(
      context,
      bcTimestampFullProofProperties.identifier,
    )
  ),
};

export default markAsBCFullTimestampProofEntry;
