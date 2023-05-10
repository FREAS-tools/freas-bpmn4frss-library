import { createIdentifier } from '../../common';
import type { FrssProperties } from '../../../types/properties';

const name = 'TimestampService';

const timestampServiceProperties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'timestamp-service',
};

export default timestampServiceProperties;
