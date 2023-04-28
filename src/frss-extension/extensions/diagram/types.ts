export type DiagramHandler = Map<string, NormalDiagram>;

export enum FrssDiagramType {
  EvidenceDiagram = 'evidence-diagram',
  Normal = 'normal-diagram',
}

export type DiagramState = NormalDiagram | FrssDiagram;

export type SemanticDiagram = {
  children: any[];
  id: string;
  parent: any;
};

export type DiagramHandle = {
  diPlane: any,
  rootElement: SemanticDiagram,
};

export type NormalDiagram = {
  diagram: DiagramHandle,
  frssDiagrams: FrssDiagram[],
  type: FrssDiagramType.Normal,
};

export type FrssDiagram = {
  baseDiagramId: string,
  diagram: DiagramHandle,
  type: Exclude<FrssDiagramType, FrssDiagramType.Normal>,
};

export const isNormalDiagram = (
  diagramState: DiagramState,
): diagramState is NormalDiagram => {
  const isNormal = diagramState as NormalDiagram;

  return (
    Array.isArray(isNormal.frssDiagrams)
    && isNormal.type === FrssDiagramType.Normal
  );
};

export const isFrssDiagram = (
  diagramState: DiagramState,
): diagramState is FrssDiagram => !isNormalDiagram(diagramState);
