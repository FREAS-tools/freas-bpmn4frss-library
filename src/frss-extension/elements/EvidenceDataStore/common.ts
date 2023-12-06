// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import evidenceStoreProperties from '../EvidenceStore/properties';

const isMarkedAsEvidenceStore = (element: any): boolean => {
  const evidenceStore = element
    ?.businessObject
    ?.dataStoreRef
    ?.isEvidenceStore;

  return is(element, 'bpmn:DataStoreReference')
    && evidenceStore !== undefined
    && is(evidenceStore, evidenceStoreProperties.identifier);
};

export default isMarkedAsEvidenceStore;
