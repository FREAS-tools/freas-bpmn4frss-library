// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import potentialEvidenceProperties from '../PotentialEvidence/properties';

const isMarkedAsEvidenceDataObject = (element: any): boolean => {
  const potentialEvidence = element
    ?.businessObject
    ?.dataObjectRef
    ?.isPotentialEvidence;

  return is(element, 'bpmn:DataObjectReference')
    && potentialEvidence !== undefined
    && is(potentialEvidence, potentialEvidenceProperties.identifier);
};

export default isMarkedAsEvidenceDataObject;
