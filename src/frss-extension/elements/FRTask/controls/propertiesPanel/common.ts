/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  SelectEntry,
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

export const FrssTaskToggleComponent = (
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
      newMarkingObject.$parent = businessObject;
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

export const FrssTaskSetInputOutput = (
  props: {
    element: any,
    id: string,
    moddlePropertyName: 'isAuthenticityComputation'
    | 'isDataTransformation' | 'isIntegrityComputation',
    mode: 'input' | 'output',
  },
) => {
  const {
    element,
    id,
    moddlePropertyName,
    mode,
  } = props;

  // use all services needed in the component
  const debounce = useService('debounceInput');
  const elementRegistry = useService('elementRegistry');
  const translate = useService('translate');

  const getValue = (elem: any) => {
    const { businessObject } = elem;
    const object = businessObject[moddlePropertyName];
    const ioProperty = object[mode];
    return ioProperty?.id;
  };

  const setValue = (value: string | undefined) => {
    const propertyElement = element.businessObject[moddlePropertyName];
    if (value === '') {
      delete propertyElement[mode];
      return;
    }

    propertyElement[mode] = elementRegistry.find(
      (elem: any) => elem.id === value,
    );
  };

  const getOptions = () => {
    const defaultValue = {
      value: '',
      label: `No ${mode}`,
    };

    const dataIOAssociations = (
      elementHasCorrectInputOutputAssociations(element)
    );

    if (dataIOAssociations === undefined) return [defaultValue];

    const returningOptions = dataIOAssociations[mode].map(
      (association: any) => ({
        value: association.id,
        label: `${association.id
        } (`
          + `${mode === 'input' ? 'source: ' : 'target: '}`
          + `${mode === 'input'
            ? association.source.id
            : association.target.id}`
          + ')',
      }),
    );

    return [
      ...returningOptions,
      defaultValue,
    ];
  };

  return SelectEntry({
    id,
    element,
    label: translate(`Set the ${mode}`),
    debounce,
    getValue,
    setValue,
    getOptions,
  });
};
