// Custom elements - every custom element is placed in this list
import { customElementsInPalette } from '../../customElements';
import { collectControlEntries } from '../../types/controls/entry';

// import { Controls, EntryData, isInPalette } from '../types/controls/controls';
// import { collectControlEntries } from '../types/controls/entry';
import newControlEntry from '../../types/controls/implementation';
import { RenderableElementProps } from '../../types/props';

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
   * @param _element unused, but specified by the library
   * @returns way to create an element from the palette
   */
  getPaletteEntries(_element: any) {
    // for each element create its palette entry
    const paletteEntries = customElementsInPalette.map((elem) => (
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
