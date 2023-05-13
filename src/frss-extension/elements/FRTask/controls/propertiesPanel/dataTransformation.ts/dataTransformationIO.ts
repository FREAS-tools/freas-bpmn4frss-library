import { FrssTaskSetInputOutput } from '../common';

export const SetDataTransformationInput = (
  props: { element: any },
) => (
  FrssTaskSetInputOutput({
    id: 'data-transformation-input',
    element: props.element,
    moddlePropertyName: 'isDataTransformation',
    mode: 'input',
  })
);

export const SetDataTransformationOutput = (
  props: { element: any },
) => (
  FrssTaskSetInputOutput({
    id: 'data-transformation-output',
    element: props.element,
    moddlePropertyName: 'isDataTransformation',
    mode: 'output',
  })
);
