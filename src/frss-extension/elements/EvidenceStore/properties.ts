import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'EvidenceStore';

const evidenceStoreProperties: FrssProperties = {
  name,
  nameLowercase: 'evidence-store',
  identifier: createIdentifier(name),
};

export default evidenceStoreProperties;
