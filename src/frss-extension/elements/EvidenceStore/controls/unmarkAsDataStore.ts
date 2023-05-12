import evidenceStoreProperties from '../properties';
import isMarked from './common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';

const unmarkDataStoreAsEvidenceStore: CreateActionHandler = (
  {
    modeling,
  },
  _elementProperties,
) => (
  (_event:any, element: any) => {
    const dataStore = element?.businessObject?.dataStoreRef;
    // not marked as evidence store
    if (
      dataStore.isEvidenceStore === undefined
      || dataStore.isEvidenceStore === false
    ) return;

    // mark the store as the evidence store
    dataStore.isEvidenceStore = false;
    modeling.updateProperties(element, {
      dataStoreRef: dataStore,
    });
  }
);

const unmarkDataStoreAsEvidenceStoreEntry: PadEntryData = {
  makeActionHandler: unmarkDataStoreAsEvidenceStore,
  props: {
    className: (
      'unmark'
    ),
    group: 'edit',
    key: `unmark-as-${evidenceStoreProperties.nameLowercase}`,
    title: 'Unmark Data Store as Evidence Store',
  },
  show: isMarked,
};

export default unmarkDataStoreAsEvidenceStoreEntry;
