import Definition from '../../types/definitions/definition';

// potential evidence source is a "dependency" of this element,
// as we need to know its identifier to be able to identify
// it as a reference type here
import evidenceSourceProperties
  from '../EvidenceSource/properties';

import properties from './properties';

const { name } = properties;

const producesDefinition: Definition = {
  name,
  // we want to create a custom association
  superClass: ['bpmn:Association'],
  properties: [
    {
      // we wish to start the `Produces` arrow in the potential evidence source
      name: 'sourceRef',
      type: evidenceSourceProperties.name,

      // we only want to refer to the XML node in this property, not
      // encapsulate it
      isReference: true,
      // this property is an attribute of the `Produces` node
      isAttr: true,
      redefines: 'bpmn:Association#sourceRef',
    },
    {
      // we wish to end the `Produces` arrow in the DataObjectReference
      // i.e. - file, email, business document and so on.
      // which can hold the `Potential Evidence`
      name: 'targetRef',
      type: 'bpmn:DataObjectReference',

      isReference: true,
      // save this as an attribute of the `Produces` XML node
      isAttr: true,
      redefines: 'bpmn:Association#targetRef',
    },
  ],
};

export default producesDefinition;
