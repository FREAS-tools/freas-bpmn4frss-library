import markDataObjectAsEvidenceEntry from './markAsEvidence';
import potentialEvidenceGroup from './propertiesPanel/potentialEvidence';
import unmarkDataObjectAsEvidenceEntry from './unmarkAsEvidence';
import type { FrssControls } from '../../../types/controls';

const potentialEvidenceControls: FrssControls = {
  padEntries: [
    markDataObjectAsEvidenceEntry,
    unmarkDataObjectAsEvidenceEntry,
  ],
  propertiesPanelControls: [
    potentialEvidenceGroup,
  ],
};

export default potentialEvidenceControls;
