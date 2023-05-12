// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import frTaskProperties from '../../../properties';
import { elementHasCorrectInputOutputAssociations } from '../common';
import DataTransformationPanelToggleSwitch from './setDataTransformation';
import type {
  PropertiesPanelData,
} from '../../../../../types/controls/propertiesPanel';

const dataTransformationGroup: PropertiesPanelData = {
  show: (element) => (
    is(element, frTaskProperties.identifier)
    && elementHasCorrectInputOutputAssociations(element) !== undefined
  ),
  group: {
    id: 'DataTransformation',
    label: 'Data Transformation',
    entries: [
      {
        id: 'set-data-transformation',
        component: DataTransformationPanelToggleSwitch,
        show: (_element) => true,
      },
    ],
  },
};

export default dataTransformationGroup;
