/**
 * IMPORT new element modules here! Each module is a custom FRSS element.
 */
import EvidenceAssociation from './EvidenceAssociation';
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
  EvidenceAssociation,
  EvidenceDataObject,
  EvidenceSource,
  PotentialEvidence,
  Produces,
];

export default frssElements;
