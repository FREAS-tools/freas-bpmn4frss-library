import { PaletteEntry } from "../../common";

export interface CustomElement {
  definition: any,
  identifier: string,
  icon?: any,
  render: (parentNode: any, element: any) => Element,
  controls: CustomElementControls
}

export interface CustomElementControls {
  createElementFunction: (
    bpmnFactory: any,
    create: any,
    elementFactory: any
  ) => (event: any) => void,
  createPaletteEntry: (
    translate: Function,
    action: Function
  ) => PaletteEntry,
}

