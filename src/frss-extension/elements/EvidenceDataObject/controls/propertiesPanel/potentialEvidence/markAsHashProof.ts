import hashProofProperties from '../../../../Proof/HashProof/properties';
import MarkPotentialEvidenceAsProof from './markAsProof';

const HashProofToggleSwitch = (props: { element: any }) => (
  MarkPotentialEvidenceAsProof({
    id: 'hash-proof',
    identifier: hashProofProperties.identifier,
    element: props.element,
    moddlePropertyName: 'isHashProof',
    switcherLabelName: 'Hash Proof',
  })
);

export default HashProofToggleSwitch;
