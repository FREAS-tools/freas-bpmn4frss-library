import evidenceStoreProperties from '../EvidenceStore/properties';

import evidenceDataStoreProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = evidenceDataStoreProperties;

const evidenceDataStoreDefinition: FrssModdleSemanticDefinition = {
  name,
  extends: ['bpmn:DataStore'],
  properties: [
    {
      name: 'isEvidenceStore',
      type: evidenceStoreProperties.identifier,
      isMany: false,
    },
  ],
};

export default evidenceDataStoreDefinition;
