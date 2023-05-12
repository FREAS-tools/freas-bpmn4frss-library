import markDataStoreAsEvidenceStoreEntry from './markAsDataStore';
import unmarkDataStoreAsEvidenceStoreEntry from './unmarkAsDataStore';
import type { FrssControls } from '../../../types/controls';

const evidenceStoreControls: FrssControls = {
  padEntries: [
    markDataStoreAsEvidenceStoreEntry,
    unmarkDataStoreAsEvidenceStoreEntry,
  ],
};

export default evidenceStoreControls;
