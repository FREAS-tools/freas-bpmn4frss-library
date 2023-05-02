import markDataObjectAsEvidenceEntry from './markAsEvidence';
import unmarkDataObjectAsEvidenceEntry from './unmarkAsEvidence';
import type { FrssControls } from '../../../types/controls';

const potentialEvidenceControls: FrssControls = {
  padEntries: [
    markDataObjectAsEvidenceEntry,
    unmarkDataObjectAsEvidenceEntry,
  ],
};

export default potentialEvidenceControls;
