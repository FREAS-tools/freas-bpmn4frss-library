/**
 * IF you wish to import a dependency name, you need to load the dependency
 * properties here
 *
 * ```typescript
 * import dependencyProperties from '../dependency/name';
 * ```
 *
 * and use it in its place like:
 *
 * ```typescript
 * dependencyProperties.name;
 * ```
 */

import { CustomElementDefinition } from '../types';
import properties from './properties';

const { name } = properties;

const xDefinition: CustomElementDefinition = {
  name,
  // pick either `superClass` or `extends` - depending on your application
  superClass: [],
  extends: [],
  properties: [],
};

export default xDefinition;
