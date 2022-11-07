import Definition from '../../types/definition';
// import the properties of another custom element, will use namely its name;
import producesProperties from '../Produces/properties';
// import own property, namely our name
import properties from './properties';

const { name } = properties;

/**
 * The "looking glass" icon, indicates that a resource can be a potential
 * source of evidence. Can be connected to either a task, event or a data store
 * (which can recursively generate more and more evidence types)
 */
const evidenceSourceDefinition: Definition = {
  name,
  superClass: ['bpmn:BaseElement', 'bpmn:FlowNode'],
  properties: [
    // is attached to another flow element,
    // keeps a reference to that BPMN element
    // and that reference is an attribute (XML storage details)
    //
    // one potential evidence source can be attached only to one flow element.
    {
      name: 'attachedToRef',
      // the concrete elements are: `Task`, `Event`, and `DataStore`
      type: 'bpmn:FlowElement',
      isAttr: true,
      isReference: true,
    },
    // can produce many evidence types - this is a meta object (think of it
    // as a join table) for connecting multiple evidence objects. We only
    // need to specify it, so the moddle knows there is an association.
    {
      name: 'producesEvidences',
      type: producesProperties.name,
      isMany: true,
    },
  ],
};

export default evidenceSourceDefinition;
