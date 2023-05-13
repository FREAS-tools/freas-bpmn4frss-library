const isMarkedAsEvidenceStore = (element: any): boolean => (
  element?.businessObject?.isEvidenceStore === 'true'
);

export default isMarkedAsEvidenceStore;
