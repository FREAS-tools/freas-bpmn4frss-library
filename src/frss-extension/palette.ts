// Custom elements - every custom element is placed in this list
import customElements from './customElements';
import { FrssElementInPalette, elementIsInPalette } from './types';
import { collectControlEntries } from './types/controls/entry';

// import { Controls, EntryData, isInPalette } from '../types/controls/controls';
// import { collectControlEntries } from '../types/controls/entry';
import newControlEntry from './types/controls/implementation';
import { RenderableElementProps } from './types/props';

/**
 * FRSS extension of the `bpmn-js` palette
 */
export default class FrssPalette {
  bpmnFactory: any;

  create: any;

  elementFactory: any;

  modeling: any;

  translate: (title: string) => string;

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
    translate: (title: string) => string,
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
    // const {
    //   bpmnFactory,
    //   create,
    //   elementFactory,
    //   modeling,
    //   translate,
    // } = this;

    // obtain only element controls submodule, filter out elements that
    // are not used for the palette
    const controls: FrssElementInPalette[] = customElements
      // add the type assertion that if we ran this filter, the
      // controls is definitely defined
      .filter(
        (elem): elem is FrssElementInPalette => elementIsInPalette(elem),
      );

    // for each element create its palette entry
    const paletteEntries = controls.map((elem) => (
      newControlEntry(
        elem.controls.createEntry.action,
        this,
        elem.properties as RenderableElementProps,
        elem.controls.createEntry.entryProps,
      )
    ));

    // return an object full of palette entries
    // (spreading 'hacked' for the library to get what it expects)
    return collectControlEntries(paletteEntries);
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
