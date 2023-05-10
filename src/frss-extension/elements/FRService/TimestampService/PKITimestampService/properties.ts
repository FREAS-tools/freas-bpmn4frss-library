import { createIdentifier } from '../../../common';
import type { FrssProperties } from '../../../../types/properties';

const name = 'PKITimestampService';

const pkiTimestampServiceProperties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'bc-timestamp-service',
};

export default pkiTimestampServiceProperties;
