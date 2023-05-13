import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'BooleanEnumeration';

const booleanEnumerationProperties: FrssProperties = {
  name,
  nameLowercase: 'boolean-enumeration',
  identifier: createIdentifier(name),
};

export default booleanEnumerationProperties;
