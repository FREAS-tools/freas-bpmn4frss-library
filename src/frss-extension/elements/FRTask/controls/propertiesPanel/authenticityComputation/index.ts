// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import frTaskProperties from '../../../properties';
import { elementHasCorrectInputOutputAssociations } from '../common';
import AuthenticityComputationPanelToggleSwitch
  from './setAuthenticityComputation';
import type {
  PropertiesPanelData,
} from '../../../../../types/controls/propertiesPanel';

const authenticityComputationGroup: PropertiesPanelData = {
  show: (element) => (
    is(element, frTaskProperties.identifier)
    && elementHasCorrectInputOutputAssociations(element) !== undefined
  ),
  group: {
    id: 'AuthenticityComputation',
    label: 'Authenticity Computation',
    entries: [
      {
        id: 'set-authenticity-computation',
        component: AuthenticityComputationPanelToggleSwitch,
        show: (_element) => true,
      },
    ],
  },
};

export default authenticityComputationGroup;
