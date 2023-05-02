import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'PotentialEvidence';

const potentialEvidenceProperties: FrssProperties = {
  identifier: createIdentifier(name),
  name,
  nameLowercase: 'potential-evidence',
};

export default potentialEvidenceProperties;
