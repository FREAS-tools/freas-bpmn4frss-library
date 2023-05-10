import { createIdentifier } from '../common';

// types
import type { FrssProperties } from '../../types/properties';

const name = 'PromiseOf';

const promiseOfProperties: FrssProperties = {
  identifier: createIdentifier(name),
  name,
  nameLowercase: 'promise-of',
};

export default promiseOfProperties;
