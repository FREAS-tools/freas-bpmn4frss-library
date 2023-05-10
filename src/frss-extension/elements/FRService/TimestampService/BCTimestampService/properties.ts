import { createIdentifier } from '../../../common';
import type { FrssProperties } from '../../../../types/properties';

const name = 'BCTimestampService';

const bcTimestampServiceProperties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'bc-timestamp-service',
};

export default bcTimestampServiceProperties;
