import { createIdentifier } from '../common';
import type { FrssProperties } from '../../types/properties';

const name = 'ForensicReadinessTask';

const properties: FrssProperties = {
  name,
  identifier: createIdentifier(name),
  nameLowercase: 'forensic-readiness-task',
};

export default properties;
