// @ts-expect-error
import { is } from 'bpmn-js/lib/util/ModelUtil';

import { FrssMode } from '../../../editor/types/mode';
import evidenceAssociationProperties from '../EvidenceAssociation/properties';
import type { ElementRules } from '../../types/rules';

const rules: ElementRules = {
  shouldCheckConnection: (source, target, mode) => (
    is(source, 'bpmn:DataObjectReference')
    && is(target, 'bpmn:DataObjectReference')
    && mode === FrssMode.EvidenceMode
  ),

  connectionRule: (source, target, _elementRegistry, connectionId) => {
    // check if there is an already existing evidence association
    const checkEvidenceAssociationExists = source.outgoing.find(
      (element: any) => (
        element.source.id === source.id
        && element.target.id === target.id
        && is(element, evidenceAssociationProperties.identifier)
      ),
    );

    const checkExisting = connectionId === undefined
      ? checkEvidenceAssociationExists === undefined
      : checkEvidenceAssociationExists.id === connectionId;

    // both objects must be `EvidenceDataObject`s, and cannot have
    // an already existing connection
    if (
      source?.businessObject?.dataObjectRef?.isPotentialEvidence
      !== undefined
      && target?.businessObject?.dataObjectRef?.isPotentialEvidence
      !== undefined
      && source.id !== target.id
      && checkExisting
    ) {
      return {
        type: evidenceAssociationProperties.identifier,
      };
    }

    return false;
  },
};

export default rules;
