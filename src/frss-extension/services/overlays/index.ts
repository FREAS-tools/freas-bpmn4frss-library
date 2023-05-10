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

export const renderOverlays = (
  overlayProvider: any,
  data: DataValidationResult,
) => {
  // display errors
  data.errors.forEach((error) => {
    error.source.forEach((elementId) => {
      overlayProvider.add(elementId, frssOverlayTypes[0], {
        ...defaultParameters,
        // eslint-disable-next-line max-len
        html: `<div class="diagram-dialog error error--${error.severity.toLowerCase()}">${error.message}</div>`,
      });
    });
  });

  // display warnings
  data.warnings.forEach((warning) => {
    warning.source.forEach((elementId) => {
      overlayProvider.add(elementId, frssOverlayTypes[1], {
        ...defaultParameters,
        html: `<div class="diagram-dialog warning">${warning.message}</div>`,
      });
    });
  });

  if (data.evidence_sources === undefined || data.evidence_sources === null) {
    return;
  }

  // display the evidence_sources message
  data.evidence_sources.source.forEach((elementId) => {
    overlayProvider.add(elementId, frssOverlayTypes[2], {
      ...defaultParameters,
      // eslint-disable-next-line max-len
      html: `<div class="diagram-dialog warning">${data.evidence_sources?.message ?? ''}</div>`,
    });
  });
};

export const removeOverlays = (
  overlayProvider: any,
) => {
  // remove all FRSS overlays
  frssOverlayTypes.forEach((frssOverlayType) => overlayProvider.remove({
    type: frssOverlayType,
  }));
};
