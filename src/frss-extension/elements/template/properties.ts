// import the prefix
import { bpmn4frssPrefix } from '../../common';
import Properties from '../../types/props';

const name = 'x';

const properties: Properties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'x',
  // size: {
  //   height: 0,
  //   width: 0,
  // },
  // offset: {
  //   x: 0,
  //   y: 0,
  // },
};

export default properties;
