import booleanEnumerationProperties from '../BooleanEnumeration/properties';
import evidenceDataObjectProperties from '../EvidenceDataObject/properties';

import evidenceStoreProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = evidenceStoreProperties;

const evidenceStoreDefinition: FrssModdleSemanticDefinition = {
  extends: ['bpmn:DataStoreReference'],
  name,
  properties: [
    {
      name: 'stores',
      type: evidenceDataObjectProperties.identifier,
      isReference: true,
      isMany: true,
    },
    {
      name: 'isEvidenceStore',
      type: booleanEnumerationProperties.identifier,
      isAttr: true,
    },
  ],
};

export default evidenceStoreDefinition;
