import { createIdentifier } from '../common';

// types
import type { FrssProperties } from '../../types/properties';

const name = 'EvidenceDataObject';

const properties: FrssProperties = {
  identifier: createIdentifier(name),
  name,
  nameLowercase: 'evidence-data-object',
};

export default properties;
