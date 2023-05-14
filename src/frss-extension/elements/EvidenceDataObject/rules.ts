// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

import evidenceAssociationProperties from '../EvidenceAssociation/properties';
import promiseOfProperties from '../PromiseOf/properties';
import bcTimestampFullProofProperties
  from '../Proof/TimestampProof/BCTimestampFullProof/properties';
import bcTimestampPartialProofProperties
  from '../Proof/TimestampProof/BCTimestampPartialProof/properties';
import isMarkedAsEvidenceDataObject from './common';
import type { FrssElementRules } from '../../types/rules';

const evidenceDataObjectRules: FrssElementRules = {
  shouldCheckConnection: ({ source, target }) => (
    is(source, 'bpmn:DataObjectReference')
    && is(target, 'bpmn:DataObjectReference')
  ),

  connectionRule: ({ source, target, identityId }) => {
    // check if there is an already existing evidence association
    // checking one way (only outgoing) is fine, as the rules check both ways
    // for compatibility
    const checkEvidenceAssociationExists = source.outgoing.find(
      (element: any) => (
        element.source.id === source.id
        && element.target.id === target.id
        && is(element, evidenceAssociationProperties.identifier)
      ),
    );

    const checkPromiseOfAssociationExists = source.outgoing.find(
      (element: any) => (
        element.source.id === source.id
        && element.target.id === target.id
        && is(element, promiseOfProperties.identifier)
      ),
    );

    const checkExisting = identityId === undefined
      ? (
        checkEvidenceAssociationExists === undefined
        && checkPromiseOfAssociationExists === undefined
      )
      : (
        checkEvidenceAssociationExists?.id === identityId
        || checkPromiseOfAssociationExists?.id === identityId
      );

    // both objects must be `EvidenceDataObject`s, and cannot have
    // an already existing connection
    if (
      isMarkedAsEvidenceDataObject(source)
      && isMarkedAsEvidenceDataObject(target)
      && source.id !== target.id
      && checkExisting
    ) {
      // check if the promise can be created
      if (
        is(
          source?.businessObject
            ?.dataObjectRef?.isPotentialEvidence?.isTimestampProof,
          bcTimestampPartialProofProperties.identifier,
        )
        && is(
          target?.businessObject
            ?.dataObjectRef?.isPotentialEvidence?.isTimestampProof,
          bcTimestampFullProofProperties.identifier,
        )
      ) {
        // check the origins of the proofs
        const sourceOrigin = source
          ?.businessObject
          ?.dataObjectRef
          ?.isPotentialEvidence
          ?.isTimestampProof
          ?.originatesFrom;
        const targetOrigin = target
          ?.businessObject
          ?.dataObjectRef
          ?.isPotentialEvidence
          ?.isTimestampProof
          ?.originatesFrom;

        // if the origins of the proofs do not match
        if (
          sourceOrigin === undefined
          || targetOrigin === undefined
          || sourceOrigin.id !== targetOrigin.id
        ) {
          return {
            type: evidenceAssociationProperties.identifier,
          };
        }

        // the source and target can be connected via a promise
        return {
          type: promiseOfProperties.identifier,
        };
      }
      return {
        type: evidenceAssociationProperties.identifier,
      };
    }

    return false;
  },
};

export default evidenceDataObjectRules;
