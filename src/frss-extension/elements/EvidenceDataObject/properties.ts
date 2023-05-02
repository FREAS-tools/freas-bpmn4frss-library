import { createIdentifier } from '../common';

// types
import type { FrssProperties } from '../../types/properties';

const name = 'EvidenceDataObject';

const evidenceDataObjectProperties: FrssProperties = {
  identifier: createIdentifier(name),
  name,
  nameLowercase: 'evidence-data-object',
};

export default evidenceDataObjectProperties;
