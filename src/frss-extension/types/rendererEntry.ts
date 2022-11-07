export interface RendererContext {
  // bpmnFactory: any,
  element: any,
  parentNode: any,
}

/**
 * Renderer entry has its context that it needs to
 * properly render the element
 */
type RendererEntry = (
  context: RendererContext
) => Element | null;

export default RendererEntry;
