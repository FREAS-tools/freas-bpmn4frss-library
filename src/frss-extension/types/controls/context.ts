/**
 * Context for creating a new control function.
 * Takes `bpmnFactory`, `elementFactory`, `modeling`, `create` and `translate`
 * providers.
 */
export type ControlsContext = {
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  modeling: any,
  translate: (title: string) => string,
};
