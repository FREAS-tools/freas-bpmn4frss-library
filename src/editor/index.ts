/* eslint-disable no-underscore-dangle */
import Modeler from 'bpmn-js/lib/Modeler';

// Color picker module
// @ts-expect-error
import ColorPickerModule from 'bpmn-js-color-picker';

// FRSS extension
import frssExtension from '../frss-extension';

// default diagram
import FrssMultipleDiagramProvider
  from '../frss-extension/extensions/diagram/multipleDiagramProvider';
import defaultDiagram from './default-diagram';

// types
import type { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';

export default class FrssModeler extends Modeler {
  private multipleDiagramProvider: FrssMultipleDiagramProvider;

  constructor(options?: BaseViewerOptions) {
    super({
      ...options,
      moddleExtensions: {
        ...options?.moddleExtensions,
        bpmn4frss: frssExtension.frssDefinitions,
      },

      additionalModules: (options?.additionalModules ?? []).concat([
        frssExtension,
        ColorPickerModule,
      ]),
    });

    this.multipleDiagramProvider = this.get('frssMultipleDiagramProvider');
  }

  setNormalMode() {
    this.multipleDiagramProvider.switchToNormalDiagram();
  }

  setEvidenceViewMode() {
    this.multipleDiagramProvider.switchToEvidenceDiagram();
  }

  async loadDiagram(diagram: string) {
    await super.importXML(diagram);
    this.multipleDiagramProvider.reset();
  }

  async loadDefaultDiagram() {
    await super.importXML(defaultDiagram);
    this.multipleDiagramProvider.reset();
  }

  resize() {
    // @ts-expect-error
    this.get('canvas').resized();
  }
}
