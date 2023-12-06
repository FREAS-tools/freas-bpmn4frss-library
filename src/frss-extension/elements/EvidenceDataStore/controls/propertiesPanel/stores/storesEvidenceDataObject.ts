import {
  ToggleSwitchEntry,
// @ts-ignore
} from '@bpmn-io/properties-panel';

// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

// @ts-ignore
import { useService } from 'bpmn-js-properties-panel';

import { html } from 'htm/preact';
import { partitionArray } from '../../../../../utility/partitionArray';

const StoresPotentialEvidenceComponent = (props: { element: any }) => {
  const evidenceStore = (
    props.element.businessObject.dataStoreRef.isEvidenceStore
  );

  const elementRegistry = useService('elementRegistry');
  const translate = useService('translate');

  // filter potential evidences
  const allPotentialEvidences = elementRegistry
    .filter(
      (elem: any) => is(elem, 'bpmn:DataObjectReference'),
    ).map(
      (dataObjectReference: any) => (
        dataObjectReference.businessObject.dataObjectRef
      ),
    ).filter(
      (dataObject: any) => (dataObject.isPotentialEvidence !== undefined),
    ).map(
      (dataObject: { isPotentialEvidence: any }) => (
        dataObject.isPotentialEvidence
      ),
    );

  // toggle switch components
  const toggleSwitches = allPotentialEvidences
    // every potential evidence has to have its own toggle switch
    .map((potentialEvidence: { $parent: { id: string }, id: string }) => {
      // check if the potential evidence is stored by this evidence store
      const getValue = (_elem: any) => {
        // check if the evidence is stored already
        const value = evidenceStore.stores?.find(
          (isStored: { id: string }) => (
            isStored.id === potentialEvidence.id
          ),
        );

        return value !== undefined;
      };

      // store potential evidence / remove it from the store
      const setValue = (_val: any) => {
        // stores is not defined
        if (evidenceStore.stores === undefined) {
          evidenceStore.stores = [];
        }

        // check if the evidence is already stored
        const isStored = partitionArray<{ id: string }>(
          evidenceStore.stores,
          (elem) => elem.id === potentialEvidence.id,
        );

        // the toggle wants to store the evidence
        if (isStored.desired.length === 0) {
          evidenceStore.stores.push(
            potentialEvidence,
          );
          return;
        }

        // the toggle wants to remove the stored evidence
        evidenceStore.stores = isStored.rest;
      };

      // the toggle switch element itself
      return ToggleSwitchEntry({
        id: potentialEvidence.id,
        element: potentialEvidence,
        getValue,
        setValue,
        switcherLabel: translate(
          `Store ${potentialEvidence.id}`
          + ` (parent: ${potentialEvidence.$parent.id})`,
        ),
      });
    });

  return html`<div>${toggleSwitches}</div>`;
};

export default StoresPotentialEvidenceComponent;
