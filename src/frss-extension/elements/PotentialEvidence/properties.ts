// import the prefix
import { bpmn4frssPrefix } from '../../common';
import { FrssElementProperties } from '../../types';

const name = 'PotentialEvidence';

const properties: FrssElementProperties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'potential-evidence',
  // elementSize: {
  //   x: 0,
  //   y: 0,
  // },
  // elementOffset: {
  //   x: 0,
  //   y: 0,
  // },
};

export default properties;