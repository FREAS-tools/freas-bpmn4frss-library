// all custom elements
import { frssPadElements } from '../../elements';

import {
  newControlEntry,
  collectControlEntries,
} from '../../types/controls/implementation';

// types
import type { FrssPadElement } from '../../types';
import type { PadEntryData } from '../../types/controls';
import type {
  ControlEntry,
  ControlEntryPropsAndActions,
} from '../../types/controls/entry';

// /* eslint-disable @typescript-eslint/no-unused-vars */
export default class FrssPadProvider {
  autoPlace: any;

  bpmnFactory: any;

  config: any;

  contextPad: any;

  create: any;

  elementFactory: any;

  injector: any;

  modeling: any;

  translate: any;

  static $inject: string[];

  constructor(
    bpmnFactory: any,
    config: any,
    contextPad: any,
    create: any,
    elementFactory: any,
    injector: any,
    modeling: any,
    translate: any,
  ) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.contextPad = contextPad;
    this.elementFactory = elementFactory;
    this.modeling = modeling;
    this.translate = translate;

    // getting the auto place position,
    // we need to check for the true value explicitly
    if (config.autoPlace !== true) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }

  /**
   * Get all entries for the context pad
   * @param element element that is associated with the context pad
   */
  getContextPadEntries(element: any): ControlEntry {
    const customEntries: ControlEntryPropsAndActions[] = frssPadElements
      // create a list of ControlEntry objects
      // (that will need to be "collected" as a single object)
      .flatMap((elem: FrssPadElement) => elem.controls.padEntries
        .filter(
          // check if the pad entry should be shown on the current element
          (padEntry) => padEntry.show(element),
        )
        .map(
          // create a new pad entry
          (padEntry: PadEntryData) => newControlEntry(
            padEntry.makeActionHandler,
            this,
            elem.properties,
            padEntry.props,
          ),
        ));

    // create the resulting object
    return collectControlEntries(customEntries);
  }
}

// we need to tell the dependency injector what dependencies we plan to
// use within our custom module
FrssPadProvider.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'modeling',
  'translate',
];
