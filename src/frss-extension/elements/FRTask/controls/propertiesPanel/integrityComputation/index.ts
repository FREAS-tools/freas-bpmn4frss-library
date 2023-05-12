// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import frTaskProperties from '../../../properties';
import { elementHasCorrectInputOutputAssociations } from '../common';
import IntegrityComputationPanelToggleSwitch from './setIntegrityComputation';
import type {
  PropertiesPanelData,
} from '../../../../../types/controls/propertiesPanel';

const integrityComputationGroup: PropertiesPanelData = {
  show: (element) => (
    is(element, frTaskProperties.identifier)
    && elementHasCorrectInputOutputAssociations(element) !== undefined
  ),
  group: {
    id: 'IntegrityComputation',
    label: 'Integrity Computation',
    entries: [
      {
        id: 'integrity-computation',
        component: IntegrityComputationPanelToggleSwitch,
        show: (_element) => true,
      },
    ],
  },
};

export default integrityComputationGroup;
