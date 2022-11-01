// potential evidence source is a "dependency" of this element,
// as we need to know its identifier to be able to identify
// it as a reference type here
import potentialEvidenceSourceProperties
  from '../PotentialEvidenceSource/properties';

// potential evidence type is a "dependency" as well and if the
// name of the element changes for whatever reason, the moddle definition
// will stay intact
import potentialEvidenceTypeProperties
  from '../PotentialEvidenceType/properties';

import { FrssElementDefinition } from '../../types';
import properties from './properties';

const { name } = properties;

const producesDefinition: FrssElementDefinition = {
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
    {
      // we wish to end the `Produces` arrow in the potential evidence type
      // i.e. - file, email, business document and so on.
      name: 'targetRef',
      type: potentialEvidenceTypeProperties.name,

      // again, we only want a reference, as the evidence type is stored
      // in the extended `bpmn:DataObject` - `bpmn4frss:EvidenceDataObject`
      isReference: true,
      // save this as an attribute of the `Produces` XML node
      isAttr: true,
    },
  ],
};

export default producesDefinition;
