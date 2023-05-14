// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import pkiTimestampServiceProperties
  from
  '../../../../../FRService/TimestampService/PKITimestampService/properties';
import pkiTimestampProofProperties
  from '../../../../../Proof/TimestampProof/PKITimestampProof/properties';
import checkOriginatesFromCorrectService
  from '../../../../timestampProof/checkOriginatesFromCorrectService';
import MarkPotentialEvidenceAsProof from '../proof/markAsProof';
import type {
  PropertiesPanelEntry,
} from '../../../../../../types/controls/propertiesPanel';

const MarkAsPKITimestampProofToggleSwitch = (props: { element: any }) => (
  MarkPotentialEvidenceAsProof({
    id: pkiTimestampProofProperties.nameLowercase,
    identifier: pkiTimestampProofProperties.identifier,
    element: props.element,
    moddlePropertyName: 'isTimestampProof',
    switcherLabelName: 'PKI Timestamp Proof',
  })
);

const markAsPKITimestampProofEntry: PropertiesPanelEntry = {
  id: `mark-as${pkiTimestampProofProperties.nameLowercase}`,
  component: MarkAsPKITimestampProofToggleSwitch,
  show: (context) => {
    const potentialEvidence = (
      context.element.businessObject?.dataObjectRef?.isPotentialEvidence
    );

    return (
      potentialEvidence !== undefined
      && checkOriginatesFromCorrectService(
        context,
        pkiTimestampServiceProperties.identifier,
      )
      && (
        potentialEvidence.isTimestampProof === undefined
        || is(
          potentialEvidence.isTimestampProof,
          pkiTimestampProofProperties.identifier,
        )
      )
    );
  },
};

export default markAsPKITimestampProofEntry;
