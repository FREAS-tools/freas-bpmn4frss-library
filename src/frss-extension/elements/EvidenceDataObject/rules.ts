// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

import type { ElementRules } from '../../types/rules';
import evidenceAssociationProperties from '../EvidenceAssociation/properties';

const rules: ElementRules = {
  shouldCheckConnection: (source, target) => (
    is(source, 'bpmn:DataObjectReference')
    && is(target, 'bpmn:DataObjectReference')
  ),
  connectionRule: (source, target, _elementRegistry) => {
    if (source?.businessObject?.dataObjectRef?.isPotentialEvidence 
        !== undefined
        && target?.businessObject?.dataObjectRef?.isPotentialEvidence
        !== undefined) {
      return {
        type: evidenceAssociationProperties.identifier,
      }
    }

    return false;
  },
};

export default rules;
