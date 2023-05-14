import { createIdentifier } from '../../../common';
import type { FrssProperties } from '../../../../types/properties';

const name = 'PkiTimestampService';

const pkiTimestampServiceProperties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'pki-timestamp-service',
};

export default pkiTimestampServiceProperties;
