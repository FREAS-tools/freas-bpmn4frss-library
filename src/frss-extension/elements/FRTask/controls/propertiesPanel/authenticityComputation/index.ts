// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import frTaskProperties from '../../../properties';
import {
  elementHasCorrectInputOutputAssociations,
} from '../common';
import AuthenticityComputationPanelToggleSwitch
  from './setAuthenticityComputation';
import {
  SetAuthenticityComputationInput,
  SetAuthenticityComputationOutput,
} from './setAuthenticityIO';
import type {
  PropertiesPanelData, PropertiesPanelEntryShowContext,
} from '../../../../../types/controls/propertiesPanel';

const elementIsAuthenticityComp = (
  { element }: PropertiesPanelEntryShowContext,
) => (
  element.businessObject?.isAuthenticityComputation !== undefined
);

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
        show: (_context) => true,
      },
      {
        id: 'set-authenticity-input',
        component: SetAuthenticityComputationInput,
        show: elementIsAuthenticityComp,
      },
      {
        id: 'set-authenticity-output',
        component: SetAuthenticityComputationOutput,
        show: elementIsAuthenticityComp,
      },
    ],
  },
};

export default authenticityComputationGroup;
