/* eslint-disable no-underscore-dangle */
import Modeler from 'bpmn-js/lib/Modeler';

import { isAny } from 'bpmn-js/lib/util/ModelUtil';

// Color picker module
// @ts-ignore
import ColorPickerModule from 'bpmn-js-color-picker';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  // @ts-ignore
} from 'bpmn-js-properties-panel';

// FRSS extension
import frssExtension from '../frss-extension';

// default diagram
import {
  removeOverlays,
  renderOverlays,
} from '../frss-extension/services/overlays';
import defaultDiagram from './default-diagram';

// types
import type {
  DataValidationResult,
  DataValidationFormData,
} from '../frss-extension/services/overlays/schemas';
import type { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';

/**
 * The main export of this library - a fully functioning and extensible
 * FrssModeler, which is extensible in the same way as the regular
 * bpmn-js modeler is
 */
export default class FrssModeler extends Modeler {
  // build the constructor and feed it into the bpmn-js Modeler
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
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
      ]),
    });
  }

  /**
   * Loads the diagram from XML
   * @param diagram loaded diagram (string)
   */
  async loadDiagram(diagram: string) {
    await super.importXML(diagram);
  }

  /**
   * Loads the default diagram (each time with unique IDs)
   */
  async loadDefaultDiagram(): Promise<string> {
    const diagram = defaultDiagram;
    await super.importXML(diagram);
    return diagram;
  }

  /**
   * Notifies the canvas that the library should be resized
   */
  resize() {
    // @ts-expect-error
    this.get('canvas').resized();
  }

  /**
   * Loads the overlays coming from an external validator
   * @param input input data to an external validator
   * @param result verified data coming from an external validator
   */
  showFrssOverlays(
    input: DataValidationFormData,
    result: DataValidationResult,
  ) {
    // overlay service reference is passed from the modeler
    // to the function which uses it
    renderOverlays(
      this.get('overlays'),
      this.get('elementRegistry'),
      result,
      input,
    );
  }

  /**
   * Removes all FRSS overlays (marked with specified IDs)
   */
  removeFrssOverlays() {
    removeOverlays(this.get('overlays'));
  }

  /**
   * Gets ids of all elements, based on the filter
   * @param filterElements only specified elements will be listed
   */
  getListOfElementIds(filterElements: string[]): string[] {
    const registry = this.get('elementRegistry');
    // @ts-ignore
    const result: string[] = registry
      .getAll()
      .filter((element: any) => isAny(element, filterElements))
      .filter((element: any) => element.type !== 'label')
      .map((element: any) => element.id as string);
    return result;
  }
}
