import evidenceDataObjectProperties from '../EvidenceDataObject/properties';

import evidenceStoreProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = evidenceStoreProperties;

const evidenceStoreDefinition: FrssModdleSemanticDefinition = {
  extends: ['bpmn:DataStore'],
  name,
  properties: [
    {
      name: 'Stores',
      type: evidenceDataObjectProperties.identifier,
      isReference: true,
      isMany: true,
    },
    {
      name: 'isEvidenceStore',
      type: 'boolean',
      isAttr: true,
    },
  ],
};

export default evidenceStoreDefinition;
