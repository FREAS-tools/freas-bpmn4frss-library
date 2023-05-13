import evidenceStoreProperties from '../properties';
import isMarkedAsEvidenceStore from './common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';
import type {
  BooleanEnumerationType,
} from '../../BooleanEnumeration/enumeration';

const unmarkDataStoreAsEvidenceStore: CreateActionHandler = (
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
    // not marked as evidence store
    if (
      businessObject.isEvidenceStore === undefined
      || businessObject.isEvidenceStore === 'false'
    ) return;

    // mark the store as the evidence store
    modeling.updateProperties(element, {
      isEvidenceStore: 'false',
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
  show: isMarkedAsEvidenceStore,
};

export default unmarkDataStoreAsEvidenceStoreEntry;
