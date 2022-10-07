import { PaletteEntry } from '../../common';

export interface CustomElement {
  controls: CustomElementControls
  definition: any,
  icon?: any,
  identifier: string,
  render: (parentNode: any, element: any) => Element,
}

export interface CustomElementControls {
  createElementFunction: (
    bpmnFactory: any,
    create: any,
    elementFactory: any
  ) => (event: any) => void,
  createPaletteEntry: (
    action: Function,
    translate: Function,
  ) => PaletteEntry,
}
