import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'EvidenceStore';

const evidenceStoreProperties: FrssProperties = {
  identifier: createIdentifier(name),
  name,
  nameLowercase: 'evidence-store',
};

export default evidenceStoreProperties;
