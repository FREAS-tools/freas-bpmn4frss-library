// import the prefix
import { bpmn4frssPrefix } from '../../common';

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

/**
 * Every element has an identifier which is comprised of the prefix and
 * the name. For example: `bpmn4frss:PotentialEvidenceSource`.
 */
export const potentialEvidenceTypeIdentifier = `${bpmn4frssPrefix}${name}`;

const potentialEvidenceTypeDefinition: CustomElementDefinition = {
  name,
  // the potential evidence type is a data object
  superClass: ['bpmn:DataObject'],
  properties: [
    {
      // the evidence type has certain data fields -> strings,
      // describe it
      name: 'dataFields',
      type: 'string',
      // there can be many data fields
      isMany: true,
    },
  ],
};

export default potentialEvidenceTypeDefinition;
