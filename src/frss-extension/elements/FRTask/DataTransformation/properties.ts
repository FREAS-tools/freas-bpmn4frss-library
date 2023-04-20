import { bpmn4frssPrefix } from '../../../common';
import type { FrssProperties } from '../../../types/properties';

const name = 'DataTransformation';

const properties: FrssProperties = {
  name,
  identifier: `${bpmn4frssPrefix}${name}`,
  nameLowercase: 'transformation',
};

export default properties;
