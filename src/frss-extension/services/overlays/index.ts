import { is } from 'bpmn-js/lib/util/ModelUtil';
import type {
  DataValidationResult,
  DataValidationFormData,
} from './schemas';

export const frssOverlayTypes = [
  'frssErrorOverlay',
  'frssWarningOverlay',
  'frssEvidenceSourceOverlay',
] as const;

const defaultParameters = {
  position: {
    bottom: -4,
    top: 0,
  },
  scale: true,
};

/**
 * Overlay (react) extension calls this function, which handles the incoming
 * data and displays it in the diagram.
 *
 * @param overlayProvider the overlay provider service from bpmn-js
 * @param elementRegistry the element registry service from bpmn-js
 * @param data incoming data from an external validator
 * @param input analysis settings send to an external validator
 */
export const renderOverlays = (
  overlayProvider: any,
  elementRegistry: any,
  data: DataValidationResult,
  input: DataValidationFormData,
) => {
  // display errors
  const errors = (result: DataValidationResult): void => {
    result.errors.forEach((error) => {
      error.source.forEach((elementId) => {
        // every error is marked as a "frssErrorOverlay"
        overlayProvider.add(elementId, frssOverlayTypes[0], {
          ...defaultParameters,
          // eslint-disable-next-line max-len
          html: `<div class="diagram-dialog error error--${error.severity?.toLowerCase() ?? 'low'}">${error.message}</div>`,
        });
      });
    });
  };

  // display warnings
  const warnings = (result: DataValidationResult): void => {
    result.warnings.forEach((warning) => {
      warning.source.forEach((elementId) => {
        // every warning is marked as a "frssWarningOverlay"
        overlayProvider.add(elementId, frssOverlayTypes[1], {
          ...defaultParameters,
          html: `<div class="diagram-dialog warning">${warning.message}</div>`,
        });
      });
    });
  };

  // display evidence sources
  const evidenceSources = (
    result: DataValidationResult,
    target_element: string,
  ): void => {
    // no supporting evidene found -> displaying message at the original element
    if (result.evidence_sources === undefined
      || result.evidence_sources === null) {
      overlayProvider.add(target_element, frssOverlayTypes[2], {
        ...defaultParameters,
        // eslint-disable-next-line max-len
        html: '<div class="diagram-dialog warning">No supporting potential evidence</div>',
      });
      return;
    }

    // display the message at evidence_sources
    result.evidence_sources.source.forEach((elementId) => {
      // Based on the returned DataStore, get its DataStoreReferences, which are rendered
      const dataStoreRefs: string[] = elementRegistry
        .getAll()
        .filter((element: any) => is(element, 'bpmn:DataStoreReference')
                                  && element.type !== 'label')
        .filter((element: any) => element.businessObject?.dataStoreRef.id
                                  === elementId)
        .map((element: any) => element.id as string);

      dataStoreRefs.forEach((dataStoreRef) => {
        // every evidence source message is marked as a "frssEvidenceSourceOverlay"
        overlayProvider.add(dataStoreRef, frssOverlayTypes[2], {
          ...defaultParameters,
          // eslint-disable-next-line max-len
          html: `<div class="diagram-dialog warning">${data.evidence_sources?.message ?? ''}</div>`,
        });
      });
    });
  };

  // eslint-disable-next-line default-case
  switch (input.analysis_type) {
    case 'SEMANTIC_RULES':
      errors(data);
      break;
    case 'SEMANTIC_HINTS':
      warnings(data);
      break;
    case 'SEMANTIC_ALL':
      errors(data);
      warnings(data);
      break;
    case 'EVIDENCE_QUALITY_ANALYSIS':
      evidenceSources(data, input.element_id);
      break;
  }
};

/**
 * Overlay (react) extension calls this function, which removes the existing
 * FRSS overlays from the diagram.
 *
 * @param overlayProvider the overlay provider service from bpmn-js
 */
export const removeOverlays = (
  overlayProvider: any,
) => {
  // remove all FRSS overlays
  frssOverlayTypes.forEach((frssOverlayType) => overlayProvider.remove({
    type: frssOverlayType,
  }));
};
