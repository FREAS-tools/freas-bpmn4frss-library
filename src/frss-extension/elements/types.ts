import { PaletteEntry } from '../common';

export interface DefinitionType {
  extends?: string[],
  name: string,
  properties: any[],
  superClass?: string[],
}

export interface CustomElement {
  controls?: CustomElementControls
  definition: DefinitionType,
  icon?: any,
  identifier: string,
  render?: (parentNode: any, element: any) => Element,
  // renderCondition?: Function,
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
