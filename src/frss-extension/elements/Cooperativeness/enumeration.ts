import properties from './properties';
import type { FrssEnumeration } from '../../types/definitions';

const { name } = properties;

const cooperativenessEnumeration: FrssEnumeration = {
  name,
  literalNames: [
    {
      name: 'Cooperative',
    },
    {
      name: 'NonCooperative',
    },
    {
      name: 'SemiCooperative',
    },
  ],
};

export default cooperativenessEnumeration;
