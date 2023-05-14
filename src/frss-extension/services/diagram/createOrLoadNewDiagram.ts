import {
  FrssDiagramSuffix,
  type MultipleDiagramProviderContext,
  type DiagramRootElement,
  type FrssDiagramType,
  type NormalDiagram,
  type DiagramState,
} from '../../types/diagrams';
import { partitionArray } from '../../utility/partitionArray';
import type FrssModeler from '../../../modeler';

const checkDiagramsLoaded = (frssModeler: FrssModeler) => {
  const definitions = frssModeler.getDefinitions();

  if (definitions === undefined) {
    throw new Error('The diagram(s) has(have) not been loaded yet!');
  }

  return definitions;
};

/**
 * Idea of this code is borrowed from:
 * @link https://github.com/bpmn-io/bpmn-js/blob/v13.0.2/lib/features/modeling/behavior/SubProcessPlaneBehavior.js#L531
 * @link https://github.com/sharedchains/camunda-modeler-plugin-multidiagram/blob/master/client/bpmn-js-extension/multi-diagram/cmd/CreateDiagramHandler.js
 */
export const createNewEmptyDiagram = (
  {
    frssModeler,
    bpmnFactory,
    elementFactory,
    canvas,
  }: MultipleDiagramProviderContext,
  existingDiagram?: {
    createType: FrssDiagramType,
    id: string
  },
): DiagramRootElement => {
  const definitions = checkDiagramsLoaded(frssModeler);

  // create a new Process / obtain an existing process for the new diagram
  const newBpmnProcess = bpmnFactory.create(
    'bpmn:Process',
    existingDiagram !== undefined ? {
      id: `${existingDiagram.id}${existingDiagram.createType}`,
    } : {},
  );

  newBpmnProcess.$parent = definitions;

  // create a new plane for the process
  const diPlane = bpmnFactory.create('bpmndi:BPMNPlane', {
    bpmnElement: newBpmnProcess,
  });

  // create a new diagram
  const diDiagram = bpmnFactory.create('bpmndi:BPMNDiagram', {
    plane: diPlane,
    planeElement: [],
  });

  // set the diagram as the parent for the plane
  diPlane.$parent = diDiagram;
  diDiagram.$parent = definitions;

  // bpmn-js team's TypeScript support is still somewhat in the "beta" stage.
  // @ts-expect-error
  definitions.diagrams.push(diDiagram);

  newBpmnProcess.flowElements = [];

  // create a root element
  const newRootElement = elementFactory.createRoot({
    id: newBpmnProcess.id,
    type: newBpmnProcess.$type,
    di: diPlane,
    businessObject: newBpmnProcess,
    collapsed: false,
  });
  canvas.addRootElement(newRootElement);

  // return the root element
  return newRootElement;
};

const filterFrssDiagrams = (diagram: DiagramRootElement) => (
  // check if the diagram id contains any of the FRSS suffixes
  FrssDiagramSuffix.find((suffix) => diagram.id.endsWith(suffix)) !== undefined
);

const addNormalDiagramState = (
  {
    elementFactory,
    diagramStateHandler,
    canvas,
  }: MultipleDiagramProviderContext,
  diagramPlaneElement: any,
  currentRootElementId: string,
) => {
  if (diagramPlaneElement.bpmnElement.id === currentRootElementId) return;

  const newRootElement = elementFactory.createRoot({
    id: diagramPlaneElement.bpmnElement.id,
    type: diagramPlaneElement.bpmnElement.$type,
    di: diagramPlaneElement,
    businessObject: diagramPlaneElement.bpmnElement,
    collapsed: false,
  });

  canvas.addRootElement(newRootElement);

  const state: NormalDiagram = {
    diagram: newRootElement,
    frssDiagrams: [],
    type: 'normal',
  };

  diagramStateHandler.set(newRootElement.id, state);
};

export const instanciateDiagramStates = (
  context: MultipleDiagramProviderContext,
): DiagramState => {
  const definitions = checkDiagramsLoaded(context.frssModeler);

  const { diagramStateHandler } = context;
  // @ts-expect-error
  const diagramProcesses = definitions.diagrams.map(
    // @ts-expect-error
    (diagram: DiagramRootElement) => diagram.plane,
  );

  // find the already-created root element by the import
  const currentRootElement: DiagramRootElement = context
    .canvas.getRootElement();

  if (currentRootElement === undefined) {
    throw new Error('No diagram was successfully created');
  }

  const currentState: NormalDiagram = {
    diagram: currentRootElement,
    frssDiagrams: [],
    type: 'normal',
  };

  diagramStateHandler.set(currentRootElement.id, currentState);

  // partition array into two groups - base diagrams and rest
  const { desired: frssDiagrams, rest: normalDiagrams } = partitionArray(
    diagramProcesses,
    filterFrssDiagrams,
  );

  // load all normal diagrams into state
  normalDiagrams.forEach((diagram) => {
    addNormalDiagramState(context, diagram, currentRootElement.id);
  });

  // load all associated diagrams
  frssDiagrams.forEach((diagram) => {
    // find the diagram type
    const diagramType = FrssDiagramSuffix.find(
      (suffix) => diagram.id.endsWith(suffix),
    );

    if (diagramType === undefined) {
      throw new Error('Loading an unsupported diagram type');
    }

    // get the base diagram
    const normalDiagram = diagramStateHandler.get(
      diagram.id.replace(diagramType, ''),
    );

    if (normalDiagram === undefined) {
      throw new Error('Associated regular BPMN4FRSS diagram does not exist.');
    }

    // associate this diagram with the normal diagram
    normalDiagram.frssDiagrams.push({
      diagram,
      baseDiagramId: normalDiagram.diagram.id,
      type: diagramType,
    });
  });

  // check if there are any unassociated diagrams
  diagramStateHandler.forEach((normalDiagram) => {
    // some associated diagram is missing
    if (normalDiagram.frssDiagrams.length !== FrssDiagramSuffix.length) {
      FrssDiagramSuffix.forEach((diagramType) => {
        // check if diagram with specified suffix exists
        const diagramExists = normalDiagram.frssDiagrams.find(
          (diagram) => diagram.type === diagramType,
        );

        if (diagramExists !== undefined) return;

        // create a new empty diagram with this type
        const frssDiagram = createNewEmptyDiagram(context, {
          createType: diagramType,
          id: normalDiagram.diagram.id,
        });

        // push the newly created diagram
        normalDiagram.frssDiagrams.push({
          diagram: frssDiagram,
          baseDiagramId: normalDiagram.diagram.id,
          type: diagramType,
        });
      });
    }
  });

  return currentState;
};
