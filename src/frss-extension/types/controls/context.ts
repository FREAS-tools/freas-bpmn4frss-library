import type { FrssMultipleDiagramProvider } from '../../services/diagram';

/**
 * Context for creating a new control function.
 * Takes `bpmnFactory`, `elementFactory`, `modeling`, `create` and `translate`
 * providers.
 */
export type ControlsContext = {
  bpmnFactory: any,
  canvas: any,
  create: any,
  elementFactory: any,
  frssMultipleDiagramProvider: FrssMultipleDiagramProvider,
  modeling: any,
  translate: (title: string) => string,
};
