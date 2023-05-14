import markDataObjectAsEvidenceEntry from './markAsEvidence';
import {
  potentialEvidenceGroup,
  proofGroup,
} from './propertiesPanel/potentialEvidence';
import unmarkDataObjectAsEvidenceEntry from './unmarkAsEvidence';
import type { FrssControls } from '../../../types/controls';

const potentialEvidenceControls: FrssControls = {
  padEntries: [
    markDataObjectAsEvidenceEntry,
    unmarkDataObjectAsEvidenceEntry,
  ],
  propertiesPanelControls: [
    potentialEvidenceGroup,
    proofGroup,
  ],
};

export default potentialEvidenceControls;
