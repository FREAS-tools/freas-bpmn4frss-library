import properties from './properties';
import type { FrssEnumeration } from '../../types/definitions';

const { name } = properties;

export const FrssCooperativeness = [
  'Cooperative',
  'SemiCooperative',
  'NonCooperative',
] as const;

export type FrssCooperativenessType = typeof FrssCooperativeness[number];

const cooperativenessEnumeration: FrssEnumeration = {
  name,
  literalNames: FrssCooperativeness.map((cooperativeness) => ({
    name: cooperativeness,
  })),
};

export default cooperativenessEnumeration;
