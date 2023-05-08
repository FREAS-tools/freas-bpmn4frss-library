// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

import { FrssMode } from '../../extensions/mode/mode';
import evidenceAssociationProperties from '../EvidenceAssociation/properties';
import type { FrssElementRules } from '../../types/rules';

const evidenceDataObjectRules: FrssElementRules = {
  shouldCheckConnection: ({ source, target, mode }) => (
    is(source, 'bpmn:DataObjectReference')
    && is(target, 'bpmn:DataObjectReference')
    && mode === FrssMode.EvidenceView
  ),

  connectionRule: ({ source, target, identityId }) => {
    // check if there is an already existing evidence association
    const checkEvidenceAssociationExists = source.outgoing.find(
      (element: any) => (
        element.source.id === source.id
        && element.target.id === target.id
        && is(element, evidenceAssociationProperties.identifier)
      ),
    );

    const checkExisting = identityId === undefined
      ? checkEvidenceAssociationExists === undefined
      : checkEvidenceAssociationExists.id === identityId;

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

export default evidenceDataObjectRules;
