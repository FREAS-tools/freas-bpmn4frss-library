import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import evidenceStoreProperties from '../../EvidenceStore/properties';
import isMarkedAsEvidenceStore from '../common';
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

    // already marked as evidence store
    if (!dataStore.isEvidenceStore) return;

    // remove element
    modeling.removeElements(dataStore.isEvidenceStore);
    delete dataStore.isEvidenceStore;

    // mark the store as the evidence store
    modeling.updateProperties(element, {
      isEvidenceStore: 'false',
    });
    // update the object properties
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
  show: (element) => (
    is(element, 'bpmn:DataStoreReference')
    && element.type !== 'label'
    && isMarkedAsEvidenceStore(element)
  ),
};

export default unmarkDataStoreAsEvidenceStoreEntry;
