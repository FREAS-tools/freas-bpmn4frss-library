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
  literalNames: [
    {
      name: FrssCooperativeness[0],
    },
    {
      name: FrssCooperativeness[1],
    },
    {
      name: FrssCooperativeness[2],
    },
  ],
};

export default cooperativenessEnumeration;
