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
  const allEvidenceDataObjects = elementRegistry
    .filter(
      (elem: any) => is(elem, 'bpmn:DataObjectReference')
                  && elem.type !== 'label',
    ).map(
      (dataObjectReference: any) => (
        {
          // Actual object to store
          obj: dataObjectReference.businessObject.dataObjectRef,
          // DataObjectReference id for display purposes
          refId: dataObjectReference.businessObject.id,
          // DataObjectReference name for display purposes
          refName: dataObjectReference.businessObject.name,
        }
      ),
    ).filter(
      (dataObject: { obj: any }) => (
        dataObject.obj.isPotentialEvidence !== undefined
      ),
    );

  // toggle switch components
  const toggleSwitches = allEvidenceDataObjects
    // every evidence data object has to have its own toggle switch
    .map((evidenceDataObject: {
      obj: { id: string },
      refId: string,
      refName: string,
    }) => {
      // check if the evidence data object is stored by this evidence store
      const getValue = (_elem: any) => {
        // check if the evidence is stored already
        const value = evidenceStore.stores?.find(
          (isStored: { id: string }) => (
            isStored.id === evidenceDataObject.obj.id
          ),
        );

        return value !== undefined;
      };

      // store evidence data object / remove it from the store
      const setValue = (_val: any) => {
        // stores is not defined
        if (evidenceStore.stores === undefined) {
          evidenceStore.stores = [];
        }

        // check if the evidence data object is already stored
        const isStored = partitionArray<{ id: string }>(
          evidenceStore.stores,
          (elem) => elem.id === evidenceDataObject.obj.id,
        );

        // the toggle wants to store the evidence data object
        if (isStored.desired.length === 0) {
          evidenceStore.stores.push(
            evidenceDataObject.obj,
          );
          return;
        }

        // the toggle wants to remove the stored evidence data object
        evidenceStore.stores = isStored.rest;
      };

      // the toggle switch element itself
      return ToggleSwitchEntry({
        id: evidenceDataObject.obj.id,
        element: evidenceDataObject.obj,
        getValue,
        setValue,
        switcherLabel: translate(
          `Store ${evidenceDataObject.obj.id}\
          (ref.: ${evidenceDataObject.refName ?? evidenceDataObject.refId})`,
        ),
      });
    });

  return html`<div>${toggleSwitches}</div>`;
};

export default StoresPotentialEvidenceComponent;
