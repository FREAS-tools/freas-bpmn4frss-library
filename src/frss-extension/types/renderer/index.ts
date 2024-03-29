/**
 * A custom type that encapsulates the renderer context
 */
export type RendererContext = {
  bpmnRenderer: any,
  element: any,
  modeling: any,
  parentNode: any
};

export type ShouldRender = (element: any) => boolean;

export enum ElementRenderType {
  Connection = 'connection',
  Shape = 'shape',
}

export type FrssRendererEntry = {
  renderFunction: RenderFunction,
  shouldRender: ShouldRender,
  type: ElementRenderType,
};

/**
 * Renderer entry has its context that it needs to
 * properly render the element
 */
export type RenderFunction = (
  context: RendererContext
) => SVGElement;
