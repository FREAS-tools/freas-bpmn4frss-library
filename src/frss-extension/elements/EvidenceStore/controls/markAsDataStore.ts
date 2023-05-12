// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import evidenceStoreProperties from '../properties';
import isMarked from './common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';

const markDataStoreAsEvidenceStore: CreateActionHandler = (
  {
    modeling,
    bpmnFactory,
  },
  _elementProperties,
) => (
  (_event:any, element: any) => {
    let dataStore = element?.businessObject?.dataStoreRef;
    if (dataStore === undefined) {
      dataStore = bpmnFactory.create(
        'bpmn:DataStore',
      );
      dataStore.$parent = element.businessObject.$parent;
    }

    // already marked as evidence store
    if (
      dataStore.isEvidenceStore === true
    ) return;

    // mark the store as the evidence store
    dataStore.isEvidenceStore = true;
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
    && !isMarked(element)
  ),
};

export default markDataStoreAsEvidenceStoreEntry;
