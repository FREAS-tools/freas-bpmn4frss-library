// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import frTaskProperties from '../../../properties';
import { elementHasCorrectInputOutputAssociations } from '../common';
import IntegrityComputationPanelToggleSwitch from './setIntegrityComputation';
import {
  SetIntegrityComputationInput,
  SetIntegrityComputationOutput,
} from './setIntegrityIO';
import type {
  PropertiesPanelData, PropertiesPanelEntryShowContext,
} from '../../../../../types/controls/propertiesPanel';

const elementIsInterityComp = (
  { element }: PropertiesPanelEntryShowContext,
) => (
  element.businessObject?.isIntegrityComputation !== undefined
);

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
        id: 'set-integrity-computation',
        component: IntegrityComputationPanelToggleSwitch,
        show: (_context) => true,
      },
      {
        id: 'set-integrity-computation-input',
        component: SetIntegrityComputationInput,
        show: elementIsInterityComp,
      },
      {
        id: 'set-integrity-computation-output',
        component: SetIntegrityComputationOutput,
        show: elementIsInterityComp,
      },
    ],
  },
};

export default integrityComputationGroup;
