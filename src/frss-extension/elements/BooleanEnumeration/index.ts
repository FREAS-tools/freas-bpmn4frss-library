import enumerationDefinition from './enumeration';
import properties from './properties';
import type { FrssElement } from '../../types';

/**
 * Element used for boolean serialisation (did not work out of the box)
 */
const BooleanEnumeration: FrssElement = {
  enumerationDefinition,
  properties,
};

export default BooleanEnumeration;
