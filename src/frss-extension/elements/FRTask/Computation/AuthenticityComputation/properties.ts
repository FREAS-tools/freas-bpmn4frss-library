import { createIdentifier } from '../../../common';

import type { FrssProperties } from '../../../../types/properties';

const name = 'AuthenticityComputation';

const authenticityComputationProperties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'authenticity-computation',
};

export default authenticityComputationProperties;
