import { createIdentifier } from '../../../common';
import type { FrssProperties } from '../../../../types/properties';

const name = 'DataTransformation';

const dataTransformationProperties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'data-transformation',
};

export default dataTransformationProperties;
