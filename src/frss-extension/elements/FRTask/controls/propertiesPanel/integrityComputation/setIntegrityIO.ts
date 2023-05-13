import { FrssTaskSetInputOutput } from '../common';

export const SetIntegrityComputationInput = (
  props: { element: any },
) => (
  FrssTaskSetInputOutput({
    id: 'integrity-computation-output',
    element: props.element,
    moddlePropertyName: 'isIntegrityComputation',
    mode: 'input',
  })
);

export const SetIntegrityComputationOutput = (
  props: { element: any },
) => (
  FrssTaskSetInputOutput({
    id: 'integrity-computation-output',
    element: props.element,
    moddlePropertyName: 'isIntegrityComputation',
    mode: 'output',
  })
);
