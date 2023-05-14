import properties from './properties';
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = properties;

const evidenceAssociationDefinition: FrssModdleSemanticDefinition = {
  name,
  superClass: ['bpmn:Association'],
  properties: [
    {
      // we wish to start the `EvidenceAssociation`
      // arrow in the potential evidence DataObjectReference
      name: 'sourceRef',
      type: 'bpmn:DataObjectReference',

      // we only want to refer to the XML node in this property, not
      // encapsulate it
      isReference: true,
      // this property is an attribute of the `Produces` node
      isAttr: true,
      redefines: 'bpmn:Association#sourceRef',
    },
    {
      // we wish to end the `EvidenceAssociation` arrow in the DataObjectReference
      name: 'targetRef',
      type: 'bpmn:DataObjectReference',

      isReference: true,
      // save this as an attribute of the `Produces` XML node
      isAttr: true,
      redefines: 'bpmn:Association#targetRef',
    },
  ],
};

export default evidenceAssociationDefinition;
