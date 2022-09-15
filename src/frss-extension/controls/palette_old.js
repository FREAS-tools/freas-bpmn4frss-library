export default class FrssPalette {
  constructor(create, elementFactory, palette, translate) {
    // this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries() {
    console.log("I get here")
  }
}
