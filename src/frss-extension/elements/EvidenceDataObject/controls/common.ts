const isMarked = (element: any): boolean => (
  element?.businessObject?.dataObjectRef?.isPotentialEvidence !== undefined
);

export default isMarked;
