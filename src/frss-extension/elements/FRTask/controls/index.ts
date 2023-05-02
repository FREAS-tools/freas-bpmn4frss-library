import authenticityComputationControls from './authenticityComputation';
import dataTransformationControls from './dataTransformation';
import integrityComputationControls from './integrityComputation';
import type { FrssControls } from '../../../types/controls';

const frTaskControls: FrssControls = {
  padEntries: [
    ...authenticityComputationControls,
    ...dataTransformationControls,
    ...integrityComputationControls,
  ],
};

export default frTaskControls;
