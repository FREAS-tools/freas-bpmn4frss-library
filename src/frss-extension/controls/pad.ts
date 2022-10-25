/* eslint-disable @typescript-eslint/no-unused-vars */
export default class FrssContextPad {
  autoPlace: any;

  bpmnFactory: any;

  config: any;

  contextPad: any;

  create: any;

  elementFactory: any;

  injector: any;

  translate: any;

  static $inject: string[];

  constructor(
    bpmnFactory: any,
    config: any,
    contextPad: any,
    create: any,
    elementFactory: any,
    injector: any,
    translate: any,
  ) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.contextPad = contextPad;
    this.translate = translate;
    this.elementFactory = elementFactory;

    // getting the auto place position,
    // we need to check for the false explicitly
    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }

  /**
   * Get all entries for the context pad
   * @param event occurring event
   * @param element element that is associated with the context pad
   */
  getContextPadEntries(event: any, element: any) {
    const {
      bpmnFactory,
      create,
      contextPad,
      translate,
      elementFactory,
    } = this;
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
  'translate',
];
