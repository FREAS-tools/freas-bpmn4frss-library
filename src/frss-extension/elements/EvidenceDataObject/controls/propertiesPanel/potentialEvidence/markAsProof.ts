import {
  ToggleSwitchEntry,
// @ts-ignore
} from '@bpmn-io/properties-panel';

// @ts-ignore
import { useService } from 'bpmn-js-properties-panel';

const MarkPotentialEvidenceAsProof = (props: {
  element: any,
  id: string,
  identifier: string,
  moddlePropertyName: 'isHashProof' | 'isTimestampProof',
  switcherLabelName: string,
}) => {
  const {
    id, element, identifier, moddlePropertyName, switcherLabelName,
  } = props;
  const potentialEvidence = (
    element.businessObject.dataObjectRef.isPotentialEvidence
  );

  // use all services needed in the component
  const translate = useService('translate');
  const bpmnFactory = useService('bpmnFactory');
  const modeling = useService('modeling');

  const getValue = (_elem: any) => (
    potentialEvidence[moddlePropertyName] !== undefined
  );

  const switcherLabel = potentialEvidence[moddlePropertyName] === undefined
    ? translate(`Mark PotentialEvidence as ${switcherLabelName}`)
    : translate(`Unmark ${switcherLabelName}`);

  const setValue = (_value: any) => {
    if (potentialEvidence[moddlePropertyName] === undefined) {
      const newProofObject = bpmnFactory.create(
        identifier,
      );

      potentialEvidence[moddlePropertyName] = newProofObject;
      newProofObject.$parent = potentialEvidence;
      modeling.updateProperties(element, {
        [moddlePropertyName]: newProofObject,
      });
      return;
    }

    delete potentialEvidence[moddlePropertyName];
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

export default MarkPotentialEvidenceAsProof;
