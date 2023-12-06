import markDataStoreAsEvidenceStoreEntry from './markAsDataStore';
import storesEvidenceGroup from './propertiesPanel/stores';
import unmarkDataStoreAsEvidenceStoreEntry from './unmarkAsDataStore';
import type { FrssControls } from '../../../types/controls';

const evidenceStoreControls: FrssControls = {
  padEntries: [
    markDataStoreAsEvidenceStoreEntry,
    unmarkDataStoreAsEvidenceStoreEntry,
  ],
  propertiesPanelControls: [
    storesEvidenceGroup,
  ],
};

export default evidenceStoreControls;
