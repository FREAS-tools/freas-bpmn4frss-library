import potentialEvidenceTypeProperties from '../PotentialEvidence/properties';

import evidenceDataObjectProperties from './properties';
import type { FrssModdleDefinition } from '../../types/definitions';

const { name } = evidenceDataObjectProperties;
const evidenceDataObjectDefinition: FrssModdleDefinition = {
  name,
  // the evidence data object extends the regular data object
  // this allows us to add information -> whether the regular dataObject
  // is a data object with evidence
  extends: ['bpmn:DataObject'],
  properties: [
    {
      // the `is` signifies the boolean nature of this
      // property - if defined, the data object IS an evidence type
      name: 'isPotentialEvidence',
      type: potentialEvidenceTypeProperties.name,
      // the extended data object can only be of one potential evidence type
      isMany: false,
    },
  ],
};

export default evidenceDataObjectDefinition;
