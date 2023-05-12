import type FrssModeler from '../../../modeler';
import type FrssModeProvider from '../../services/mode/mode';

/**
 * Diagram state handler (a HashMap keeping the state)
 */
export type DiagramStateHandler = Map<string, NormalDiagram>;

/**
 * Type-safe way of adding new types of diagrams and iterating over them
 */
export const FrssDiagramSuffix = ['_EvidenceView'] as const;
export type FrssDiagramType = typeof FrssDiagramSuffix[number];

export const FrssEvidenceViewDiagram = FrssDiagramSuffix[0];

/**
 * Types of diagram state - either a normal diagram
 * (keeping track of associated diagrams), or a FRSS diagram
 */
export type DiagramState = NormalDiagram | FrssDiagram;

/**
 * A bpmn-js interface for working with diagrams
 */
export type DiagramRootElement = {
  children: any[];
  di: any;
  id: string;
  parent: any;
};

/**
 * Normal diagram's state type - handle, as well as associated diagrams
 */
export type NormalDiagram = {
  diagram: DiagramRootElement,
  frssDiagrams: FrssDiagram[],
  type: 'normal',
};

/**
 * Frss diagram's state type - points to the normal diagram
 * and keeps track of its own diagram, along with the type
 */
export type FrssDiagram = {
  baseDiagramId: string;
  diagram: DiagramRootElement,
  type: FrssDiagramType,
};

/**
 * Type guard to check if state is a normal diagram
 * @param diagramState current diagram state
 * @returns true if the object is a normal diagram
 */
export const isNormalDiagram = (
  diagramState: DiagramState,
): diagramState is NormalDiagram => {
  const isNormal = diagramState as NormalDiagram;

  return (
    Array.isArray(isNormal.frssDiagrams)
    && isNormal.type === 'normal'
  );
};

/**
 * Type guard to check if state is a FRSS diagram
 * @param diagramState current diagram state
 * @returns true if the object is a FRSS diagram
 */
export const isFrssDiagram = (
  diagramState: DiagramState,
): diagramState is FrssDiagram => {
  const isFrss = diagramState as FrssDiagram;

  return (
    isFrss.baseDiagramId !== undefined
    && isFrss.diagram !== undefined
    && (isFrss as any).frssDiagrams === undefined
    && (isFrss as any).type !== 'normal'
  );
};

/**
 * Context for functions outside of FrssMultipleDiagramProvider
 */
export type MultipleDiagramProviderContext = {
  bpmnFactory: any;
  canvas: any;
  diagramStateHandler: DiagramStateHandler;
  elementFactory: any;
  frssModeProvider: FrssModeProvider;
  frssModeler: FrssModeler;
  palette: any;
};
