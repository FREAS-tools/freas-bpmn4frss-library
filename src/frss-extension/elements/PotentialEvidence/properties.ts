// import the prefix
import { bpmn4frssPrefix } from '../../common';
import Properties from '../../types/properties/properties';

const name = 'PotentialEvidence';

const properties: Properties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'potential-evidence',
};

export default properties;
