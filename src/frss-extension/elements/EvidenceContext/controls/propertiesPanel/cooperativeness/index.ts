// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import evidenceContextProperties from '../../../properties';
import CooperativenessPanelSelector from './component';
import type {
  PropertiesPanelData,
} from '../../../../../types/controls/propertiesPanel';

const cooperativenessGroup: PropertiesPanelData = {
  show: (element) => is(element, evidenceContextProperties.identifier),
  group: {
    id: 'Cooperativeness',
    label: 'Cooperativeness',
    entries: [
      {
        id: 'set-cooperativeness',
        component: CooperativenessPanelSelector,
        show: (_context) => true,
      },
    ],
  },
};

export default cooperativenessGroup;
