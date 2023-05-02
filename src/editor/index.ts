/* eslint-disable no-underscore-dangle */
import Modeler from 'bpmn-js/lib/Modeler';

// Color picker module
// @ts-expect-error
import ColorPickerModule from 'bpmn-js-color-picker';

// FRSS extension
import frssExtension from '../frss-extension';

// default diagram
import defaultDiagram from './default-diagram';

// types
import type { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';

export default class FrssModeler extends Modeler {
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
  }

  async loadDiagram(diagram: string) {
    await super.importXML(diagram);
  }

  async loadDefaultDiagram() {
    await super.importXML(defaultDiagram);
  }

  resize() {
    // @ts-expect-error
    this.get('canvas').resized();
  }
}
