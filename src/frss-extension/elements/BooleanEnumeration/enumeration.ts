import properties from './properties';
import type { FrssModdleEnumerationDefinition } from '../../types/definitions';

const { name } = properties;

export const BooleanEnumeration = [
  'true',
  'false',
] as const;

export type BooleanEnumerationType = typeof BooleanEnumeration[number];

const cooperativenessEnumeration: FrssModdleEnumerationDefinition = {
  name,
  literalNames: BooleanEnumeration.map((bool) => ({
    name: bool,
  })),
};

export default cooperativenessEnumeration;
