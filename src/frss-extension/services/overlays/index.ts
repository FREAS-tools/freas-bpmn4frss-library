import { isAny } from 'bpmn-js/lib/util/ModelUtil';
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
 * Elements reported by an external validator might not be renderable.
 * The function searches for a renderable representative to display the overlay.
 *
 * @param elementRegistry the element registry service from bpmn-js
 * @param elementId element id reported by an external validator
 */
const getRenderableIds = (
  elementRegistry: any,
  elementId: string,
): string[] => {
  const element = elementRegistry.get(elementId);
  if (element === undefined || element == null) {
    // check if the element is renderable
    const renderableIds: string[] = elementRegistry
      .getAll()
      .filter((e: any) => isAny(e, [
        'bpmn:DataObjectReference',
        'bpmn:DataStoreReference',
      ]) && e.type !== 'label')
      .filter((e: any) => e.businessObject?.dataStoreRef?.id
                      === elementId
                      || e.businessObject?.dataObjectRef?.id
                      === elementId)
      .map((e: any) => e.id as string);
    return renderableIds;
  }
  return [element.id];
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
        getRenderableIds(elementRegistry, elementId).forEach((id) => {
          // every error is marked as a "frssErrorOverlay"
          overlayProvider.add(id, frssOverlayTypes[0], {
            ...defaultParameters,
            // eslint-disable-next-line max-len
            html: `<div class="diagram-dialog error error--${error.severity?.toLowerCase() ?? 'low'}">${error.message}</div>`,
          });
        });
      });
    });
  };

  // display warnings
  const warnings = (result: DataValidationResult): void => {
    result.warnings.forEach((warning) => {
      warning.source.forEach((elementId) => {
        getRenderableIds(elementRegistry, elementId).forEach((id) => {
          // every warning is marked as a "frssWarningOverlay"
          overlayProvider.add(id, frssOverlayTypes[1], {
            ...defaultParameters,
            // eslint-disable-next-line max-len
            html: `<div class="diagram-dialog warning">${warning.message}</div>`,
          });
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
      getRenderableIds(elementRegistry, elementId).forEach((id) => {
        // every evidence source message is marked as a "frssEvidenceSourceOverlay"
        overlayProvider.add(id, frssOverlayTypes[2], {
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
