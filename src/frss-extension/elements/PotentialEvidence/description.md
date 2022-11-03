# `PotentialEvidence`

Potential Evidence is a construct which allows the user to mark the `bpmn:DataObject` type as an evidence object. The existence of `PotentialEvidence` "transforms" the `DataObject` that it's attached to into a `EvidenceDataObject`. This transformation extends the information we can attach to the `DataObject` with properties contained within `PotentialEvidence`.

Properties of the `PotentialEvidence`:

- [x] `dataFields`
  
  We can embed custom information about the evidence type in the `dataFields` property. Each field is just a string, containing the information.

- [ ] (**TODO** not implemented) `lifecycle`

  We can also specify the lifetime cycle of the evidence. @TODO: Specify this portion

## Implemented features

- [x] Name properties

## To be implemented

- [ ] Moddle definition  
  - [x] `dataFields` property
  - [ ] `lifecycle` property
- [ ] Renderer & controls properties
- [ ] Renderer function
- [ ] Rules
  - [ ] Create rules
  - [ ] Behavior rules

We need to add the lifecycle property to the moddle definition to store the information about the evidence lifecycle. We need to add the renderer and controls properties. We need to create a rendering option - how to render that the `DataObject` is a potential evidence type. \[@TODO: maybe the rendering will be done in the `EvidenceDataObject` type.\]. We need to create rules of how to create this object and how to display it in the viewer.
