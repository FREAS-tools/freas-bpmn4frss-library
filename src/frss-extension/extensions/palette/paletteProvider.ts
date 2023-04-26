// @ts-expect-error
import PaletteProvider from 'bpmn-js/lib/features/palette/PaletteProvider';

// custom elements that belong in a palette
import { frssPaletteElements } from '../../elements';
import {
  newControlEntry,
  collectControlEntries,
} from '../../types/controls/implementation';

/**
 * FRSS extension of the `bpmn-js` palette
 */
export default class FrssPaletteProvider {
  bpmnFactory: any;

  create: any;

  elementFactory: any;

  modeling: any;

  translate: (title: string) => string;

  static $inject: string[] = [
    'bpmnFactory',
    'create',
    'elementFactory',
    'modeling',
    'palette',
    'translate',
  ];

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
    const paletteEntries = frssPaletteElements.map((elem) => (
      newControlEntry(
        elem.controls.paletteCreateEntry.makeActionHandler,
        this,
        elem.properties,
        elem.controls.paletteCreateEntry.props,
      )
    ));

    // return an object full of palette entries
    // (spreading 'hacked' for the library to get what it expects)
    return collectControlEntries(paletteEntries);
  }
}
