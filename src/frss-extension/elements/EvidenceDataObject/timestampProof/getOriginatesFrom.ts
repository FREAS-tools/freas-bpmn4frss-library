// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import timestampServiceProperties
  from '../../FRService/TimestampService/properties';
import isMarkedAsEvidenceDataObject from '../common';

const getOriginatesFrom = (element: any) => {
  // it has to be marked as evidence data object
  if (!isMarkedAsEvidenceDataObject(element)) return undefined;

  // check if the evidence data object has a data output association coming
  // from an event
  const event = element?.incoming?.find(
    // look through the incoming associations
    (dataObjectAssociation: any) => {
      const checkIfEvent = dataObjectAssociation
        ?.source;

      // check if the source of the data association is an Event
      const isEvent = is(checkIfEvent, 'bpmn:Event');

      // the potential event cannot be undefined and has to be an event
      return (checkIfEvent !== undefined && isEvent);
    },
  );

  // event was not found
  if (event === undefined) return undefined;

  // find if there is a service which is connected to the
  // event (via message flow)
  const originatesFrom = event?.source?.incoming?.find(
    (eventAssociation: any) => (
      is(
        eventAssociation
          ?.businessObject
          ?.sourceRef,
        timestampServiceProperties.identifier,
      )
    ),
  );

  // return the timestamp service if found
  return originatesFrom?.businessObject?.sourceRef;
};

export default getOriginatesFrom;
