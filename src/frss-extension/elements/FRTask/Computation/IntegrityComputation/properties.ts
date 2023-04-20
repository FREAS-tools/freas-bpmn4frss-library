import { createIdentifier } from '../../../common';

import type { FrssProperties } from '../../../../types/properties';

const name = 'IntegrityComputation';

const properties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'integrity-computation',
};

export default properties;
