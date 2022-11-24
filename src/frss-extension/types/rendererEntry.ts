export interface RendererContext {
  // bpmnFactory: any,
  bpmnRenderer: any,
  element: any,
  parentNode: any,
}

export type ShouldRender = (element: any) => boolean;

interface ElementRender {
  renderFunction: RenderFunction,
  renderOnElements: string[],
  shouldRender: ShouldRender,
}

/**
 * Renderer entry has its context that it needs to
 * properly render the element
 */
export type RenderFunction = (
  context: RendererContext
) => Element | null | void;

export default ElementRender;