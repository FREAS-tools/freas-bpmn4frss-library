import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'ForensicReadinessService';

const frServiceProperties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'forensic-readiness-service',
};

export default frServiceProperties;
