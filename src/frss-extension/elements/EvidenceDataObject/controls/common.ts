// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

const isMarkedAsEvidenceDataObject = (element: any): boolean => (
  is(element, 'bpmn:DataObjectReference')
  && element?.businessObject?.dataObjectRef?.isPotentialEvidence !== undefined
);

export default isMarkedAsEvidenceDataObject;
