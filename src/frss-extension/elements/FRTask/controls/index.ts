import authenticityComputationGroup
  from './propertiesPanel/authenticityComputation';
import dataTransformationGroup from './propertiesPanel/dataTransformation.ts';
import integrityComputationGroup
  from './propertiesPanel/integrityComputation';
import type { FrssControls } from '../../../types/controls';

const frTaskControls: FrssControls = {
  propertiesPanelControls: [
    authenticityComputationGroup,
    dataTransformationGroup,
    integrityComputationGroup,
  ],
};

export default frTaskControls;
