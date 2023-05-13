import {
  TextAreaEntry,
// @ts-ignore
} from '@bpmn-io/properties-panel';

// @ts-ignore
import { useService } from 'bpmn-js-properties-panel';

const DataFieldComponent = (
  props: {
    element: any,
    id: string,
    potentialEvidenceType: string
  },
) => {
  const { id, element, potentialEvidenceType } = props;
  const potentialEvidence = (
    element.businessObject.dataObjectRef.isPotentialEvidence
  );

  // const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => (
    potentialEvidence.dataField ?? ''
  );

  const setValue = (value: string) => {
    potentialEvidence.dataField = value;
  };

  return TextAreaEntry({
    id,
    element,
    label: translate(`Data field of a ${potentialEvidenceType}`),
    getValue,
    setValue,
    debounce,
  });
};

export default DataFieldComponent;
