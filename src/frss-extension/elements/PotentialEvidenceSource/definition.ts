/**
 * Every element has a moddle definition. It is a definition of data object
 * properties, which indicates how the object is stored / loaded from files.
 * Also provides a first step of defining relations between language constructs.
 *
 *
 * The "looking glass" icon, indicates that a resource can be a potential
 * source of evidence. Can be connected to either a task, event or a data store
 * (which can recursively generate more and more evidence types)
 */
const potentialEvidenceSource = {
  name: 'PotentialEvidenceSource',
  superClass: ['bpmn:BaseElement', 'bpmn:FlowNode'],
  properties: [
    // is attached to another flow element,
    // keeps a reference to that BPMN element
    // and that reference is an attribute (XML storage details)
    //
    // one potential evidence source can be attached only to one flow element.
    {
      name: 'attachedToRef',
      // @TODO: ask if this is desired functionality in the moddle
      type: 'bpmn:FlowElement',
      isAttr: true,
      isReference: true,
    },
    // can produce many associations - this is a meta object (think of it
    // as a join table) for connecting multiple objects. We only
    // need to specify it, so the moddle knows there is an association.
    {
      name: 'producesAssociations',
      type: 'ProducesAssosciation',
      isMany: true,
    },
  ],
};

export default potentialEvidenceSource;
