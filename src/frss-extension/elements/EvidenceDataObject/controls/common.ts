const isMarkedAsEvidenceDataObject = (element: any): boolean => (
  element?.businessObject?.dataObjectRef?.isPotentialEvidence !== undefined
);

export default isMarkedAsEvidenceDataObject;
