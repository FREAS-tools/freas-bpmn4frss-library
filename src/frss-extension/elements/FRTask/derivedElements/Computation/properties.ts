import { createIdentifier } from '../../../common';
import type { FrssProperties } from '../../../../types/properties';

const name = 'Computation';

const computationProperties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'computation',
};

export default computationProperties;
