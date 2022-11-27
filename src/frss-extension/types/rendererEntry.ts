export interface RendererContext {
  // bpmnFactory: any,
  bpmnRenderer: any,
  element: any,
  parentNode: any,
}

export type ShouldRender = (element: any) => boolean;

export enum ElementRenderType {
  Element,
  Connection,
}

interface ElementRender {
  renderFunction: RenderFunction,
  renderOnElements: string[],
  shouldRender: ShouldRender,
  type: ElementRenderType,
}

/**
 * Renderer entry has its context that it needs to
 * properly render the element
 */
export type RenderFunction = (
  context: RendererContext
) => Element | null | void;

export default ElementRender;
