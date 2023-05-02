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
import Proof from './Proof';
import HashProof from './Proof/HashProof';
import TimestampProof from './Proof/TimestampProof';
import BCTimestampFullProof from './Proof/TimestampProof/BCTimestampFullProof';
import BCTimestampPartialProof
  from './Proof/TimestampProof/BCTimestampPartialProof';
import PKITimestampProof from './Proof/TimestampProof/PKITimestampProof';

/*
 *
 * ADD the imported element here
 *
 *
*/
const frssElements = [
  AuthenticityComputation,
  BCTimestampFullProof,
  BCTimestampPartialProof,
  Computation,
  Cooperativeness,
  DataTransformation,
  EvidenceAssociation,
  EvidenceContext,
  EvidenceDataObject,
  EvidenceSource,
  ForensicReadinessTask,
  HashProof,
  IntegrityComputation,
  PKITimestampProof,
  PotentialEvidence,
  Produces,
  Proof,
  TimestampProof,
] as const;

export default frssElements;
