// @ts-ignore
import isMarkedAsEvidenceStore from '../../../common';
import StoresPotentialEvidenceComponent from './storesEvidenceDataObject';
import type {
  PropertiesPanelData,
} from '../../../../../types/controls/propertiesPanel';

const storesEvidenceGroup: PropertiesPanelData = {
  show: (element: any) => {
    const evidenceStore = (
      element.businessObject?.dataStoreRef?.isEvidenceStore
    );

    return (
      isMarkedAsEvidenceStore(element)
      && evidenceStore !== undefined
    );
  },
  group: {
    id: 'storesEvidence',
    label: 'Evidence storage controls',
    entries: [
      {
        id: 'set-stored-evidence',
        component: StoresPotentialEvidenceComponent,
        show: (_context) => true,
      },
    ],
  },
};

export default storesEvidenceGroup;
