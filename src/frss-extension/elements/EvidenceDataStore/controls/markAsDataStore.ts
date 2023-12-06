// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import evidenceStoreProperties from '../../EvidenceStore/properties';
import isMarkedAsEvidenceStore from '../common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';

const markDataStoreAsEvidenceStore: CreateActionHandler = (
  {
    bpmnFactory,
    modeling,
  },
  _elementProperties,
) => (
  (_event:any, element: any) => {
    const dataStore = element?.businessObject?.dataStoreRef;

    // already marked as evidence store
    if (dataStore.isEvidenceStore !== undefined) return;

    // create a new `EvidenceStore` object
    const EvidenceStore = bpmnFactory.create(
      evidenceStoreProperties.identifier,
    );

    // update properties of objects
    dataStore.isEvidenceStore = EvidenceStore;
    EvidenceStore.$parent = dataStore;
    modeling.updateProperties(element, {
      dataStoreRef: dataStore,
    });
  }
);

const markDataStoreAsEvidenceStoreEntry: PadEntryData = {
  makeActionHandler: markDataStoreAsEvidenceStore,
  props: {
    className: (
      'mark-as mark-as--default'
    ),
    group: 'edit',
    key: `mark-as-${evidenceStoreProperties.nameLowercase}`,
    title: 'Mark Data Store as Evidence Store',
  },
  show: (element) => (
    is(element, 'bpmn:DataStoreReference')
    && element.type !== 'label'
    && !isMarkedAsEvidenceStore(element)
  ),
};

export default markDataStoreAsEvidenceStoreEntry;
