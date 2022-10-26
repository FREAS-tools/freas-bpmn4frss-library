// import the prefix
import { bpmn4frssPrefix } from '../../common';

// potential evidence source is a "dependency" of this element,
// as we need to know its identifier to be able to identify
// it as a reference type here
import potentialEvidenceSourceProperties
  from '../PotentialEvidenceSource/properties';

import { CustomElementDefinition } from '../types';
import properties from './properties';

const { name } = properties;

/**
 * Every element has an identifier which is comprised of the prefix and
 * the name. For example: `bpmn4frss:PotentialEvidenceSource`.
 */
export const producesIdentifier = `${bpmn4frssPrefix}${name}`;

const producesDefinition: CustomElementDefinition = {
  name,
  // pick either `superClass` or `extends` - depending on your application
  superClass: ['bpmn:BaseElement'],
  properties: [
    {
      // we wish to start the `Produces` arrow in the potential evidence source
      name: 'sourceRef',
      type: potentialEvidenceSourceProperties.name,

      // we only want to refer to the XML node in this property, not
      // encapsulate it
      isReference: true,
      // this property is an attribute of the `Produces` node
      isAttr: true,
    },
  ],
};

export default producesDefinition;
