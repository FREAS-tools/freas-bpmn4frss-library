// import the prefix
import { bpmn4frssPrefix } from '../../common';
import { CustomElementProperties } from '../types';

const name = 'PotentialEvidenceType';

const properties: CustomElementProperties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'potential-evidence-type',
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
