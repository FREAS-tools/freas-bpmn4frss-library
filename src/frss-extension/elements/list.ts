/**
 * IMPORT new element modules here! Each module is a custom FRSS element.
 */
import Cooperativeness from './Cooperativeness';
import EvidenceAssociation from './EvidenceAssociation';
import EvidenceContext from './EvidenceContext';
import EvidenceDataObject from './EvidenceDataObject';
import EvidenceSource from './EvidenceSource';
import PotentialEvidence from './PotentialEvidence';
import Produces from './Produces';

/*
 *
 * ADD the imported element here
 *
 *
*/
const frssElements = [
  Cooperativeness,
  EvidenceAssociation,
  EvidenceContext,
  EvidenceDataObject,
  EvidenceSource,
  PotentialEvidence,
  Produces,
] as const;

export default frssElements;
