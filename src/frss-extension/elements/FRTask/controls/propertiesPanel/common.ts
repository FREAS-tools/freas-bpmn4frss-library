import {
  ToggleSwitchEntry,
// @ts-ignore
} from '@bpmn-io/properties-panel';

// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

// @ts-ignore
import { useService } from 'bpmn-js-properties-panel';

export const elementHasCorrectInputOutputAssociations = (element: any) => {
  // if the element has both the data input & output
  // from `EvidenceDataObject`s, we can mark it as
  // integrity computation
  const incomingEvidenceDataInputAssociations = element.incoming.filter(
    (association: any) => (
      is(association, 'bpmn:DataInputAssociation')
      && (
        association
          ?.source?.businessObject?.dataObjectRef?.isPotentialEvidence
        !== undefined
      )
    ),
  );

  const outgoingEvidenceDataOutputAssociations = element.outgoing.filter(
    (association: any) => (
      is(association, 'bpmn:DataOutputAssociation')
      && (
        association
          ?.target?.businessObject?.dataObjectRef?.isPotentialEvidence
        !== undefined
      )
    ),
  );

  if (incomingEvidenceDataInputAssociations.length > 0
    && outgoingEvidenceDataOutputAssociations.length > 0) {
    return {
      input: incomingEvidenceDataInputAssociations,
      output: outgoingEvidenceDataOutputAssociations,
    };
  }

  return undefined;
};

const FrssTaskComponent = (
  props: {
    element: any,
    id: string,
    identifier: string,
    moddlePropertyName: string,
    switcherLabelName: string,
  },
) => {
  const {
    element,
    switcherLabelName,
    id,
    identifier,
    moddlePropertyName,
  } = props;

  const { businessObject } = element;

  const translate = useService('translate');
  const bpmnFactory = useService('bpmnFactory');
  const modeling = useService('modeling');

  const switcherLabel = businessObject[moddlePropertyName] === undefined
    ? translate(`Mark Task as ${switcherLabelName}`)
    : translate(`Unmark Task as ${switcherLabelName}`);
  const getValue = (_elem: any) => (
    businessObject[moddlePropertyName] !== undefined
  );

  const setValue = (_value: any) => {
    if (businessObject[moddlePropertyName] === undefined) {
      const newMarkingObject = bpmnFactory.create(
        identifier,
      );

      businessObject[moddlePropertyName] = newMarkingObject;
      modeling.updateProperties(element, {
        [moddlePropertyName]: newMarkingObject,
      });
      return;
    }

    delete businessObject[moddlePropertyName];
    modeling.updateProperties(element, {
      [moddlePropertyName]: undefined,
    });
  };

  return ToggleSwitchEntry({
    id,
    element,
    getValue,
    setValue,
    switcherLabel,
  });
};

export default FrssTaskComponent;
