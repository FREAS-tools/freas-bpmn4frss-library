/**
 * IMPORT new element modules here! Each module is a custom FRSS element.
 */
import BooleanEnumeration from './BooleanEnumeration';
import Cooperativeness from './Cooperativeness';
import EvidenceAssociation from './EvidenceAssociation';
import EvidenceContext from './EvidenceContext';
import EvidenceDataObject from './EvidenceDataObject';
import EvidenceSource from './EvidenceSource';
import EvidenceStore from './EvidenceStore';
import ForensicReadinessService from './FRService';
import TimestampService from './FRService/TimestampService';
import BCTimestampService
  from './FRService/TimestampService/BCTimestampService';
import PKITimestampService
  from './FRService/TimestampService/PKITimestampService';
import ForensicReadinessTask from './FRTask';
import Computation from './FRTask/derivedElements/Computation';
import AuthenticityComputation
  from './FRTask/derivedElements/Computation/AuthenticityComputation';
import IntegrityComputation
  from './FRTask/derivedElements/Computation/IntegrityComputation';
import DataTransformation
  from './FRTask/derivedElements/DataTransformation';
import PotentialEvidence from './PotentialEvidence';
import Produces from './Produces';
import PromiseOf from './PromiseOf';
import Proof from './Proof';
import HashProof from './Proof/HashProof';
import TimestampProof from './Proof/TimestampProof';
import BCTimestampFullProof from './Proof/TimestampProof/BCTimestampFullProof';
import BCTimestampPartialProof
  from './Proof/TimestampProof/BCTimestampPartialProof';
import PKITimestampProof from './Proof/TimestampProof/PKITimestampProof';

// type
import type { FrssElement } from '../types';

/*
 *
 * ADD the imported element here
 *
 *
*/
const frssElements: readonly FrssElement[] = [
  AuthenticityComputation,
  BCTimestampFullProof,
  BCTimestampPartialProof,
  BCTimestampService,
  BooleanEnumeration,
  Computation,
  Cooperativeness,
  DataTransformation,
  EvidenceAssociation,
  EvidenceContext,
  EvidenceDataObject,
  EvidenceSource,
  EvidenceStore,
  ForensicReadinessTask,
  ForensicReadinessService,
  HashProof,
  IntegrityComputation,
  PKITimestampProof,
  PKITimestampService,
  PotentialEvidence,
  Produces,
  PromiseOf,
  Proof,
  TimestampProof,
  TimestampService,
] as const;

export default frssElements;
