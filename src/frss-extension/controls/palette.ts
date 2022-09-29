// Custom elements - every custom element is placed in this list
import customElements from '../customElements';

import { PaletteEntry } from '../common';
import { CustomElementControls } from '../elements/Types/elementTypes';

/**
 * Create the palette entry object from a list of entries
 *
 * @param {PaletteEntry[]} paletteEntries entries for the palette
 * @returns single palette entry object
 */
const createEntryObject = (paletteEntries: PaletteEntry[]): PaletteEntry => {
  // empty object
  let result = {};

  // copy the key-value pairs into the object
  paletteEntries.forEach((entry) => {
    result = {
      ...result,
      ...entry,
    };
  });

  // return finished object
  return result;
};

/**
 * FRSS extension of the `bpmn-js` palette
 */
export default class FrssPalette {
  bpmnFactory: any;
  create: any;
  elementFactory: any;
  translate: Function;
  static $inject: string[];

  /**
   * This class is used by the `bpmn-js` internals,
   * extending the abilities of the original palette.
   * All of the parameters are specified by the `bpmn-js`
   * and allow us to hook into the default palette.
   */
  constructor(
    bpmnFactory: any,
    create: any,
    elementFactory: any,
    palette: any,
    translate: Function
  ) {
    // save the parameters into the object
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    // register this class to the palette provider -> extending the default
    // behaviour of the palette
    palette.registerProvider(this);
  }

  getPaletteEntries(_: any) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate,
    } = this;

    // obtain only element controls submodule
    const controls: CustomElementControls[] = customElements.map(
      (customElement) => customElement.controls,
    );

    // for each element create its palette entry
    const paletteEntries = controls.map((control) => {
      // create a function that creates an element
      const createElementFunction = control.createElementFunction(
        bpmnFactory,
        create,
        elementFactory,
      );

      // create the palette entry
      return control.createPaletteEntry(translate, createElementFunction);
    });

    // return an object full of palette entries
    // (spreading 'hacked' for the library to get what it expects)
    return createEntryObject(paletteEntries);
  }
}

FrssPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate',
]