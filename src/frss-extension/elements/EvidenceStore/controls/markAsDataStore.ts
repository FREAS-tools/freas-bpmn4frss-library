// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import evidenceStoreProperties from '../properties';
import isMarkedAsEvidenceStore from './common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';
import type {
  BooleanEnumerationType,
} from '../../BooleanEnumeration/enumeration';

const markDataStoreAsEvidenceStore: CreateActionHandler = (
  {
    modeling,
  },
  _elementProperties,
) => (
  (_event:any, element: any) => {
    const { businessObject }: {
      businessObject: {
        isEvidenceStore: BooleanEnumerationType | undefined
      }
    } = element;

    // already marked as evidence store
    if (businessObject.isEvidenceStore === 'true') return;

    // mark the store as the evidence store
    modeling.updateProperties(element, {
      isEvidenceStore: 'true',
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
    && !isMarkedAsEvidenceStore(element)
  ),
};

export default markDataStoreAsEvidenceStoreEntry;
