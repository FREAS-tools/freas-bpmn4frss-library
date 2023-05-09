import potentialEvidenceProperties from '../PotentialEvidence/properties';
import hashProofProperties from './HashProof/properties';
import proofProperties from './properties';
import timestampProofProperties from './TimestampProof/properties';
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = proofProperties;

const proofDefinition: FrssModdleSemanticDefinition = {
  name,
  extends: [potentialEvidenceProperties.identifier],
  properties: [
    {
      name: 'isHashProof',
      type: hashProofProperties.identifier,
      isMany: false,
    },
    {
      name: 'isTimestampProof',
      type: timestampProofProperties.identifier,
      isMany: false,
    },
  ],
};

export default proofDefinition;
