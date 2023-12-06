import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'EvidenceDataStore';

const evidenceDataStoreProperties: FrssProperties = {
  name,
  nameLowercase: 'evidence-data-store',
  identifier: createIdentifier(name),
};

export default evidenceDataStoreProperties;
