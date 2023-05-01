import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'EvidenceContext';

const evidenceContextProperties: FrssProperties = {
  name,
  nameLowercase: 'evidence-context',
  identifier: createIdentifier(name),
};

export default evidenceContextProperties;
