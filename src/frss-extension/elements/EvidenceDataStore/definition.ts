import booleanEnumerationProperties from '../BooleanEnumeration/properties';

import evidenceDataStoreProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = evidenceDataStoreProperties;

const evidenceDataStoreDefinition: FrssModdleSemanticDefinition = {
  name,
  extends: ['bpmn:DataStore'],
  properties: [
    {
      name: 'isEvidenceStore',
      type: booleanEnumerationProperties.identifier,
      isMany: false,
    },
  ],
};

export default evidenceDataStoreDefinition;
