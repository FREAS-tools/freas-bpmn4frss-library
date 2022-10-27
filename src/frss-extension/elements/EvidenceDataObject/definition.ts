// import the prefix
import { bpmn4frssPrefix } from '../../common';

import potentialEvidenceTypeProperties
  from '../PotentialEvidenceType/properties';

import { CustomElementDefinition } from '../types';
import properties from './properties';

const { name } = properties;

/**
 * Every element has an identifier which is comprised of the prefix and
 * the name. For example: `bpmn4frss:PotentialEvidenceSource`.
 */
export const evidenceDataObjectIdentifier = `${bpmn4frssPrefix}${name}`;

const evidenceDataObjectDefinition: CustomElementDefinition = {
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
