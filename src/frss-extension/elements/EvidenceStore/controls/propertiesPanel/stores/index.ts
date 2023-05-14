// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import evidenceStoreProperties from '../../../properties';
import isMarkedAsEvidenceStore from '../../common';
import StoresPotentialEvidenceComponent from './storesEvidenceDataObject';
import type {
  PropertiesPanelData,
} from '../../../../../types/controls/propertiesPanel';

const storesEvidenceGroup: PropertiesPanelData = {
  show: (element) => (
    is(element, evidenceStoreProperties.identifier)
    && isMarkedAsEvidenceStore(element)
  ),
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
