# `PotentialEvidenceSource`

FRSS extension - marks either a `bpmn:Task`, `bpmn:Event`, or `bpmn:DataStore` as the `PotentialEvidenceSource`. This means that the element which this extension attaches to is an origin of some evidence data. The potential evidence source is marked with a looking glass icon.

Properties of the `PotentialEvidenceSource`:

- [x] `attachedToRef`

  Reference to the object which the potential evidence source is attached to. Potential evidence source can only be attached to one object (BPMN element). The concrete elements are: `Task`, `Event`, and `DataStore`.

- [x] `producesEvidences`

  **One** potential evidence **source can produce multiple evidence** types. This creates a "pointer" (`Produces` FRSS element), which has a source (this instance of the `PotentialEvidenceSource` element) and a target (a `PotentialEvidenceType` element).

## Implemented features

- [x] Name properties
- [x] Moddle definition
- [x] Renderer & controls properties
  - [x] Size
  - [x] Offset
- [x] Renderer function

## To be implemented

- [ ] Controls functions
  - [x] Palette entry
  - [ ] Pad entry
- [ ] Rules
  - [ ] Create rules
  - [ ] Behavior rules

The controls still lack a pad entry logic. The rules for creation and behavior within the modeler are not yet defined. The rules for creating the `Produces` arrow (association) are not yet defined \[these mark the `DataObject` as `EvidenceDataObject` with its `PotentialEvidenceType`\].
