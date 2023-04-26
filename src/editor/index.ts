/* eslint-disable no-underscore-dangle */
import Modeler from 'bpmn-js/lib/Modeler';

// Color picker module
// @ts-expect-error
import ColorPickerModule from 'bpmn-js-color-picker';

// FRSS extension
import frssExtension from '../frss-extension';

// default diagram
import FrssMultipleDiagramProvider
  from '../frss-extension/extensions/diagram/switching';
import defaultDiagram from './default-diagram';

// types
import { FrssMode } from './types/mode';
import type { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';

export default class FrssModeler extends Modeler {
  private mode: FrssMode;

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

    this.mode = FrssMode.Normal;
    this.multipleDiagramProvider = this.get('frssMultipleDiagramProvider');
  }

  get diagramMode() {
    return this.mode;
  }

  /**
   * Allows setting diagram mode.
   * Only possible if the setter is an instance of
   * `FrssMultipleDiagramProvider`
   *
   * @param mode new Mode
   * @param setterInstance instance of the setter
   */
  setDiagramMode<T>(mode: FrssMode, setterInstance: T) {
    if (setterInstance instanceof FrssMultipleDiagramProvider) {
      this.mode = mode;
    }
  }

  async setNormalMode() {
    await this.multipleDiagramProvider.switchToNormalDiagram();
  }

  async setEvidenceViewMode() {
    await this.multipleDiagramProvider.switchToEvidenceDiagram();
  }

  async loadDiagram(diagram: string) {
    await super.importXML(diagram);
    this.multipleDiagramProvider.reset();
  }

  async loadDefaultDiagram() {
    await super.importXML(defaultDiagram);
    this.multipleDiagramProvider.reset();
  }
}
