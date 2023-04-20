import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'EvidenceAssociation';

const evidenceAssociationProperties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'evidence-association',
};

export default evidenceAssociationProperties;
