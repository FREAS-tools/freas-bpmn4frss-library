// import the prefix
import { bpmn4frssPrefix } from '../../common';
import { CustomElementProperties } from '../types';

const name = 'Produces';

const properties: CustomElementProperties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'produces',
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
