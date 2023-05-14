// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import bcTimestampServiceProperties
  from
  '../../../../../FRService/TimestampService/BCTimestampService/properties';
import checkOriginatesFromCorrectService
  from '../timestampProof/checkOriginatesFromCorrectService';
import type {
  PropertiesPanelEntryShowContext,
} from '../../../../../../types/controls/propertiesPanel';

// When a proof has been marked, only show one button that can toggle it off,
// not both
const differentiateBCTimestamp = (
  context: PropertiesPanelEntryShowContext,
  identifier: string,
) => {
  const potentialEvidence = (
    context.element.businessObject?.dataObjectRef?.isPotentialEvidence
  );

  return (
    // element is potential evidence
    potentialEvidence !== undefined
    // element can become a bc timestamp proof
    && checkOriginatesFromCorrectService(
      context,
      bcTimestampServiceProperties.identifier,
    )
    // element is either unmarked, or marked as the desired type (identifier)
    && (
      potentialEvidence.isTimestampProof === undefined
      || is(
        potentialEvidence.isTimestampProof,
        identifier,
      )
    )
  );
};

export default differentiateBCTimestamp;
