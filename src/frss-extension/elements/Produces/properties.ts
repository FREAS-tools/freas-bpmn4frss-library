// import the prefix
import { bpmn4frssPrefix } from '../../common';
import Properties from '../../types/props';

const name = 'Produces';

const properties: Properties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'produces',
};

export default properties;
