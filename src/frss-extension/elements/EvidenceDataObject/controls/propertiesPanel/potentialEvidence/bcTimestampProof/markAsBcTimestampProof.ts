// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import bcTimestampServiceProperties
  from
  '../../../../../FRService/TimestampService/BCTimestampService/properties';
import isMarkedAsEvidenceDataObject from '../../../common';
import type {
  PropertiesPanelEntryShowContext,
} from '../../../../../../types/controls/propertiesPanel';

// Potential Evidence can become any BCTimestamp proof
const showMarkAsAnyBCTimestampProof = (
  { element }: PropertiesPanelEntryShowContext,
) => {
  const potentialEvidence = (
    element.businessObject?.dataObjectRef?.isPotentialEvidence
  );

  return isMarkedAsEvidenceDataObject(element)
  && potentialEvidence !== undefined
  && element?.incoming?.find(
    (dataObjectAssociation: any) => {
      const potentialEvent = dataObjectAssociation
        ?.source;
      const isEvent = is(potentialEvent, 'bpmn:Event');

      // the potential event cannot be undefined and has to be an event
      if (potentialEvent === undefined || !isEvent) return false;

      const eventHasMessageFromBCTimestampService = (
        potentialEvent?.incoming?.find(
          (eventAssociation: any) => (
            is(
              eventAssociation
                ?.businessObject
                ?.sourceRef,
              bcTimestampServiceProperties.identifier,
            )
          ),
        )
      );

      return eventHasMessageFromBCTimestampService !== undefined;
    },
  );
};

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
    && showMarkAsAnyBCTimestampProof(context)
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
