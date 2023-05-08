// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

const elementHasCorrectInputOutputAssociations = (element: any) => {
  // if the element has both the data input & output
  // from `EvidenceDataObject`s, we can mark it as
  // integrity computation
  const hasIncomingDataInputAssociation = element.incoming.find(
    (association: any) => (
      is(association, 'bpmn:DataInputAssociation')
      && (
        association
          ?.source?.businessObject?.dataObjectRef?.isPotentialEvidence
        !== undefined
      )
    ),
  );

  const hasOutGoingDataOutputAssociation = element.outgoing.find(
    (association: any) => (
      is(association, 'bpmn:DataOutputAssociation')
      && (
        association
          ?.target?.businessObject?.dataObjectRef?.isPotentialEvidence
        !== undefined
      )
    ),
  );

  if (hasIncomingDataInputAssociation !== undefined
    && hasOutGoingDataOutputAssociation !== undefined) {
    return {
      input: hasIncomingDataInputAssociation.source,
      output: hasOutGoingDataOutputAssociation.target,
    };
  }

  return undefined;
};

export default elementHasCorrectInputOutputAssociations;
