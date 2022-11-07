// @ts-ignore
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

// all custom elements
import customElements from '../customElements';

// types
import { elementIsInPad, FrssElementInPad } from '../types';
import { PadEntryData } from '../types/controls/controls';
import { collectControlEntries, ControlEntry } from '../types/controls/entry';
import newElementEntry from '../types/controls/implementation';

/* eslint-disable @typescript-eslint/no-unused-vars */
export default class FrssContextPad {
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
  getContextPadEntries(element: any) {
    const entries: ControlEntry[] = customElements
      // filter out elements that belong to the pad
      .filter(
        (elem): elem is FrssElementInPad => elementIsInPad(elem),
      )
      // create a list of ControlEntry objects
      // (that will need to be "collected" as a single object)
      .flatMap((elem: FrssElementInPad) => elem.controls.padEntries
        .filter(
          // check if the pad entry should be shown on the current element
          (padEntry) => {
            console.log(element);
            return isAny(element, padEntry.showOnElements);
          },
        )
        .map(
          // create a new pad entry
          (padEntry: PadEntryData) => newElementEntry(
            padEntry.action,
            this,
            elem.properties,
            padEntry.entryProps,
          ),
        ));

    // spread the pad entry
    return collectControlEntries(entries);
  }
}

// we need to tell the dependency injector what dependencies we plan to
// use within our custom module
FrssContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'modeling',
  'translate',
];
