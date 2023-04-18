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

import properties from './properties';

// types
import type { FrssModdleDefinition } from '../../types/definitions';

const { name } = properties;

const potentialEvidenceDefinition: FrssModdleDefinition = {
  name,
  // the potential evidence is based on the BPMN element
  superClass: ['bpmn:BaseElement'],
  properties: [
    {
      // the evidence type has certain data fields -> strings,
      // describe it
      name: 'dataField',
      type: 'string',
      // there can be many data fields
      isMany: true,
    },
    {
      name: 'lifecycleProcess',
      type: 'string',
    },
  ],
};

export default potentialEvidenceDefinition;
