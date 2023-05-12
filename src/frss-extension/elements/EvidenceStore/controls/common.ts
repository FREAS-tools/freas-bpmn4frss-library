const isMarked = (element: any): boolean => (
  element?.businessObject?.dataStoreRef?.isEvidenceStore === true
);

export default isMarked;
