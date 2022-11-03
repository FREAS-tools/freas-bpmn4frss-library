import { FrssElementDefinition } from '../../types';
import potentialEvidenceTypeProperties
  from '../PotentialEvidence/properties';

import properties from './properties';

const { name } = properties;
const evidenceDataObjectDefinition: FrssElementDefinition = {
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
