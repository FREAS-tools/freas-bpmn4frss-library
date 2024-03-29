// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import frTaskProperties from '../../../properties';
import { elementHasCorrectInputOutputAssociations } from '../common';
import {
  SetDataTransformationInput,
  SetDataTransformationOutput,
} from './dataTransformationIO';
import DataTransformationPanelToggleSwitch from './setDataTransformation';
import SetDataTransformationScript from './setDataTransformationScript';
import type {
  PropertiesPanelData, PropertiesPanelEntryShowContext,
} from '../../../../../types/controls/propertiesPanel';

const elementIsDataTrans = ({ element }: PropertiesPanelEntryShowContext) => (
  element.businessObject?.isDataTransformation !== undefined
);

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
        show: (_context) => true,
      },
      {
        id: 'set-data-transformation-input',
        component: SetDataTransformationInput,
        show: elementIsDataTrans,
      },
      {
        id: 'set-data-transformation-output',
        component: SetDataTransformationOutput,
        show: elementIsDataTrans,
      },
      {
        id: 'set-data-transformation-script',
        component: SetDataTransformationScript,
        show: elementIsDataTrans,
      },
    ],
  },
};

export default dataTransformationGroup;
