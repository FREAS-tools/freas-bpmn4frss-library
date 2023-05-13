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

import potentialEvidenceProperties from './properties';

// types
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = potentialEvidenceProperties;

const potentialEvidenceDefinition: FrssModdleSemanticDefinition = {
  name,
  // the potential evidence is based on the BPMN element
  superClass: ['bpmn:BaseElement'],
  properties: [
    {
      // the evidence type has certain data fields -> strings,
      // describe it
      name: 'dataField',
      type: 'string',
      isAttr: true,
    },
    {
      name: 'lifecycleProcess',
      type: 'string',
    },
  ],
};

export default potentialEvidenceDefinition;
