import { CustomPaletteEntry } from '../common';

/**
 * The properties of a custom element
 */
export interface CustomElementProperties {
  elementOffset?: {
    x: number,
    y: number,
  }
  elementSize?: {
    x: number,
    y: number,
  },
  identifier: string,
  name: string,
  nameLowercase: string,
}

/**
 * The moddle definition of a custom element
 */
export interface CustomElementDefinition {
  extends?: string[],
  name: string,
  properties: any[],
  superClass?: string[],
}

/**
 * The controls attributes of a custom elements
 */
export interface CustomElementControls {
  createElementFunction: (
    bpmnFactory: any,
    create: any,
    elementFactory: any
  ) => (event: any) => void,
  createPaletteEntry: (
    action: Function,
    translate: Function,
  ) => CustomPaletteEntry,
}

/**
 * The structure of a custom element
 */
export interface CustomElement {
  controls?: CustomElementControls
  definition: CustomElementDefinition,
  icon?: any,
  properties: CustomElementProperties,
  render?: (parentNode: any, element: any) => Element | null,
}
