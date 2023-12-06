import evidenceDataObjectProperties from '../EvidenceDataObject/properties';

import evidenceStoreProperties from './properties';

// types
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = evidenceStoreProperties;

const evidenceStoreDefinition: FrssModdleSemanticDefinition = {
  name,
  // the evidence store is based on the BPMN element
  superClass: ['bpmn:BaseElement'],
  properties: [
    {
      name: 'stores',
      type: evidenceDataObjectProperties.identifier,
      isReference: true,
      isMany: true,
    },
  ],
};

export default evidenceStoreDefinition;
