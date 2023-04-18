// import the prefix
import { bpmn4frssPrefix } from '../../common';

// types
import type { Properties } from '../../types/properties';

const name = 'Produces';

const properties: Properties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'produces',
};

export default properties;
