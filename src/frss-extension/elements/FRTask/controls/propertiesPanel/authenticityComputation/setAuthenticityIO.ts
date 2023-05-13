import { FrssTaskSetInputOutput } from '../common';

export const SetAuthenticityComputationInput = (props: { element: any }) => (
  FrssTaskSetInputOutput({
    id: 'authenticity-input',
    element: props.element,
    moddlePropertyName: 'isAuthenticityComputation',
    mode: 'input',
  })
);

export const SetAuthenticityComputationOutput = (props: { element: any }) => (
  FrssTaskSetInputOutput({
    id: 'authenticity-output',
    element: props.element,
    moddlePropertyName: 'isAuthenticityComputation',
    mode: 'output',
  })
);
