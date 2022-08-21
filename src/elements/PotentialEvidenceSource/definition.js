/**
 * The "looking glass" icon, indicates that a resource can be a potential
 * source of evidence. Can be connected to either a task, event or a data store
 * (which can recursively generate more and more evidence types)
 */
const potentialEvidenceSource = {
  name: 'PotentialEvidenceSource',
  extends: ['bpmn:BaseElement', 'bpmn:FlowNode'],
  properties: [
    // is attached to another flow element,
    // keeps a reference to that BPMN element
    // and that reference is an attribute (XML storage details)
    //
    // one potential evidence source can be attached only to one flow element.
    {
      name: 'attachedTo',
      // @TODO: ask if this is desired functionality in the moddle
      type: 'bpmn:FlowElement',
      isAttr: true,
      isReference: true,
    },
    // can produce many associations
    {
      name: 'producesAssociations',
      type: 'ProducesAssosciation',
      isMany: true,
    },
  ],
};

export default potentialEvidenceSource;
