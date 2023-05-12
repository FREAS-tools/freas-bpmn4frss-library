import {
  SelectEntry,
// @ts-ignore
} from '@bpmn-io/properties-panel';

// @ts-ignore
import { useService } from 'bpmn-js-properties-panel';

import {
  FrssCooperativeness,
  type FrssCooperativenessType,
} from '../../../../Cooperativeness/enumeration';

// Create a preact component for the properties panel, utilising the already
// existing markup from the bpmn-js-properties-panel implementation
const CooperativenessPanelSelector = (props: any) => {
  const { element } = props;

  // use all services needed in the component
  const translate = useService('translate');
  const debounce = useService('debounceInput');
  const modeling = useService('modeling');

  // obtain the cooperativeness value
  const getValue = (elem: any) => {
    const { businessObject } = elem;

    if (businessObject.cooperativeness === undefined) {
      // NonCooperative
      return FrssCooperativeness[2];
    }

    return businessObject.cooperativeness;
  };

  // set the cooperativeness value
  const setValue = (value: FrssCooperativenessType) => {
    modeling.updateProperties(element, {
      cooperativeness: value,
    });
  };

  // get all possible cooperativeness enumerations
  const getOptions = () => (
    FrssCooperativeness.map((cooperativeness) => ({
      value: cooperativeness, label: translate(cooperativeness),
    }))
  );

  return SelectEntry({
    id: 'cooperativeness',
    element,
    label: translate('Select cooperativeness'),
    debounce,
    description: translate('Sets the cooperativeness of a FRSS participant'),
    getValue,
    setValue,
    getOptions,
  });
};

export default CooperativenessPanelSelector;
