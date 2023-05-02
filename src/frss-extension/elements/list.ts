/**
 * IMPORT new element modules here! Each module is a custom FRSS element.
 */
import Cooperativeness from './Cooperativeness';
import EvidenceAssociation from './EvidenceAssociation';
import EvidenceContext from './EvidenceContext';
import EvidenceDataObject from './EvidenceDataObject';
import EvidenceSource from './EvidenceSource';
import ForensicReadinessTask from './FRTask';
import Computation from './FRTask/Computation';
import AuthenticityComputation
  from './FRTask/Computation/AuthenticityComputation';
import IntegrityComputation from './FRTask/Computation/IntegrityComputation';
import DataTransformation from './FRTask/DataTransformation';
import PotentialEvidence from './PotentialEvidence';
import Produces from './Produces';

/*
 *
 * ADD the imported element here
 *
 *
*/
const frssElements = [
  AuthenticityComputation,
  Computation,
  Cooperativeness,
  DataTransformation,
  EvidenceAssociation,
  EvidenceContext,
  EvidenceDataObject,
  EvidenceSource,
  ForensicReadinessTask,
  IntegrityComputation,
  PotentialEvidence,
  Produces,
] as const;

export default frssElements;
