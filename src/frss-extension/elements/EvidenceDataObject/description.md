# `EvidenceDataObject`

FRSS extension of the regular `bpmn:DataObject` which allows us to append the `bpmn4frss:PotentialEvidenceType` property to the regular BPMN `DataObject`. This allows us to store the `PotentialEvidenceType` "inside" the `bpmn4frss:EvidenceDataObject`. There can logically be only one `EvidenceDataObject` associated with one `PotentialEvidenceType`, as the evidence type object specifies the associated data and the lifecycle of the evidence.

Properties of the `EvidenceDataObject`:

- [x] `isPotentialEvidence`

  This property extends **ALL** BPMN `DataObject` objects. If the `isPotentialEvidence` is defined, the `DataObject` stores some potential evidence.

## Implemented features

- [x] Name properties
- [x] Moddle definition

Names and moddle definition are complete. Moddle will recognize and extend every `bpmn:DataObject` with an optional attribute `isPotentialEvidence`. When defined, the `DataObject` is an `EvidenceDataObject` with an attached `PotentialEvidenceType`.

## To be implemented

- [ ] Renderer & controls properties
  - [ ] Size
  - [ ] Offset
- [ ] Renderer function

Renderer & controls properties are used by the render function and the controls functions. Ideally, when attaching `Produces` arrow to a data object, it shall create the `PotentialEvidenceType` and re-render the `EvidenceDataObject` item differently than a normal `DataObject`.
