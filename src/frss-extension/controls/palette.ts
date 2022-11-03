// Custom elements - every custom element is placed in this list
import customElements from '../customElements';

import { joinControlEntries, CreateFrssElementControlEntry } from '../types';

/**
 * FRSS extension of the `bpmn-js` palette
 */
export default class FrssPalette {
  bpmnFactory: any;

  create: any;

  elementFactory: any;

  modeling: any;

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
    modeling: any,
    palette: any,
    translate: Function,
  ) {
    // save the parameters into the object
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.modeling = modeling;
    this.translate = translate;

    // register this class to the palette provider -> extending the default
    // behaviour of the palette
    palette.registerProvider(this);
  }

  /**
   * Retrieve the custom palette entries for newly added objects
   *
   * @param element unused, but specified by the library
   * @returns way to create an element from the palette
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPaletteEntries(element: any) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      modeling,
      translate,
    } = this;

    // obtain only element controls submodule, filter out elements that
    // are not used for the palette
    const controls: CreateFrssElementControlEntry[] = customElements
      .map(
        (customElement) => customElement?.controls?.createPaletteEntry,
      )
      // add the type assertion that if we ran this filter, the
      // controls is definitely defined
      .filter(
        ((entry): entry is CreateFrssElementControlEntry => !!entry),
      );

    // for each element create its palette entry
    const paletteEntries = controls.map((control) => (
      control(
        bpmnFactory,
        create,
        elementFactory,
        translate,
        { modeling },
      )
    ));

    // return an object full of palette entries
    // (spreading 'hacked' for the library to get what it expects)
    return joinControlEntries(paletteEntries);
  }
}

// we need to tell the dependency injector what dependencies we plan to
// use within our custom module
FrssPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'modeling',
  'palette',
  'translate',
];
