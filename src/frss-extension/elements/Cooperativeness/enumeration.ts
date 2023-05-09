import properties from './properties';
import type { FrssModdleEnumerationDefinition } from '../../types/definitions';

const { name } = properties;

export const FrssCooperativeness = [
  'Cooperative',
  'SemiCooperative',
  'NonCooperative',
] as const;

export type FrssCooperativenessType = typeof FrssCooperativeness[number];

const cooperativenessEnumeration: FrssModdleEnumerationDefinition = {
  name,
  literalNames: FrssCooperativeness.map((cooperativeness) => ({
    name: cooperativeness,
  })),
};

export default cooperativenessEnumeration;
