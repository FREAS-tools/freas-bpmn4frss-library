import type { DataValidationResult } from './schemas';

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
 * @param data incoming data from an external validator
 */
export const renderOverlays = (
  overlayProvider: any,
  data: DataValidationResult,
  target_element?: string,
) => {
  // display errors
  data.errors.forEach((error) => {
    error.source.forEach((elementId) => {
      // every error is marked as a "frssErrorOverlay"
      overlayProvider.add(elementId, frssOverlayTypes[0], {
        ...defaultParameters,
        // eslint-disable-next-line max-len
        html: `<div class="diagram-dialog error error--${error.severity?.toLowerCase() ?? 'low'}">${error.message}</div>`,
      });
    });
  });

  // display warnings
  data.warnings.forEach((warning) => {
    warning.source.forEach((elementId) => {
      // every warning is marked as a "frssWarningOverlay"
      overlayProvider.add(elementId, frssOverlayTypes[1], {
        ...defaultParameters,
        html: `<div class="diagram-dialog warning">${warning.message}</div>`,
      });
    });
  });

  // no supporting evidene found -> displaying that at the original element
  if (data.evidence_sources === undefined || data.evidence_sources === null) {
    overlayProvider.add(target_element, frssOverlayTypes[2], {
      ...defaultParameters,
      // eslint-disable-next-line max-len
      html: '<div class="diagram-dialog warning">No supporting potential evidence</div>',
    });
    return;
  }

  // display the evidence_sources message
  data.evidence_sources.source.forEach((elementId) => {
    // every evidence source message is marked as a "frssEvidenceSourceOverlay"
    overlayProvider.add(elementId, frssOverlayTypes[2], {
      ...defaultParameters,
      // eslint-disable-next-line max-len
      html: `<div class="diagram-dialog warning">${data.evidence_sources?.message ?? ''}</div>`,
    });
  });
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
