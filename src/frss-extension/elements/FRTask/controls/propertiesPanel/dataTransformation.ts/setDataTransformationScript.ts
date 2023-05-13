import {
  TextAreaEntry,
// @ts-ignore
} from '@bpmn-io/properties-panel';

// @ts-ignore
import { useService } from 'bpmn-js-properties-panel';

const SetDataTransformationScript = (
  props: {
    element: any,
    id: string,
  },
) => {
  const { id, element } = props;
  const dataTransformation = (
    element.businessObject.isDataTransformation
  );

  // const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  // gets the value from potential evidence / proof
  const getValue = () => (
    dataTransformation.script ?? ''
  );

  // sets the value of potential evidence / proof
  const setValue = (value: string) => {
    dataTransformation.script = value;
  };

  return TextAreaEntry({
    id,
    element,
    label: translate('Script'),
    description: translate(
      'Put the script for the DataTransformation task here',
    ),
    getValue,
    setValue,
    debounce,
  });
};

export default SetDataTransformationScript;
