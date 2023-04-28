/**
 * Adding multiple diagram support
 */
import FrssModeProvider, { FrssMode } from '../mode/mode';
import { isFrssDiagram, isNormalDiagram, FrssDiagramType } from './types';

import type {
  DiagramHandle,
  DiagramHandler,
  DiagramState,
  SemanticDiagram,
} from './types';
import type FrssModeler from '../../../editor';
import type FrssPalette from '../palette/palette';

export default class FrssMultipleDiagramProvider {
  static $inject: string[] = [
    'bpmnjs',
    'bpmnFactory',
    'bpmnRenderer',
    'canvas',
    'elementFactory',
    'frssModeProvider',
    'palette',
  ];

  private bpmnFactory: any;

  private bpmnRenderer: any;

  private canvas: any;

  private diagramState: DiagramState;

  private diagrams: DiagramHandler;

  private elementFactory: any;

  private frssModeler: FrssModeler;

  private frssModeProvider: FrssModeProvider;

  private palette: FrssPalette;

  constructor(
    frssModeler: FrssModeler,
    bpmnFactory: any,
    bpmnRenderer: any,
    canvas: any,
    elementFactory: any,
    frssModeProvider: FrssModeProvider,
    palette: FrssPalette,
  ) {
    // initial value is not defined, this is just a dummy value
    // rather than dealing with `undefined`
    this.diagramState = {
      diagram: {
        rootElement: {
          id: '',
          children: [],
          parent: undefined,
        },
        diPlane: undefined,
      },
      frssDiagrams: [],
      type: FrssDiagramType.Normal,
    };

    this.frssModeler = frssModeler;
    this.frssModeProvider = frssModeProvider;

    // diagram state handler
    this.diagrams = new Map();
    this.bpmnFactory = bpmnFactory;
    this.bpmnRenderer = bpmnRenderer;
    this.elementFactory = elementFactory;
    this.canvas = canvas;
    this.palette = palette;
  }

  /**
   * This method is called only once and is set to initialize the
   * first diagram once the library loads.
   *
   * @param id id of the diagram
   * @param diagram the obtained diagram
   */
  private setInitialDiagramState() {
    if (this.diagrams.size === 0) {
      const definitions = this.frssModeler.getDefinitions();

      if (definitions === undefined) {
        return new Error('The diagram has not been loaded yet.');
      }
      const initialDiagram = this.canvas.getRootElement();
      console.log(initialDiagram);

      if (initialDiagram === undefined) {
        throw new Error('No diagrams available!');
      }

      // create the correct initial state
      const diagramState: DiagramState = {
        diagram: {
          rootElement: initialDiagram,
          diPlane: initialDiagram.di.plane,
        },
        frssDiagrams: [],
        type: FrssDiagramType.Normal,
      };

      // set the state
      this.diagramState = diagramState;

      // save the diagram state for later tracking
      this.diagrams.set(initialDiagram.id, diagramState);

      // create an associated evidence diagram for the "regular"
      // (normal) diagram
      this.createNewEvidenceDiagram();
      return;
    }

    this.reset();
  }

  reset() {
    // clear saved diagrams
    this.diagrams.clear();
    // create an initial state
    this.setInitialDiagramState();
  }

  /**
   * Idea of this code is borrowed from:
   * @link https://github.com/bpmn-io/bpmn-js/blob/v13.0.2/lib/features/modeling/behavior/SubProcessPlaneBehavior.js#L531
   * @link https://github.com/sharedchains/camunda-modeler-plugin-multidiagram/blob/master/client/bpmn-js-extension/multi-diagram/cmd/CreateDiagramHandler.js
   */
  private createEmptyDiagram(currentProcess?: SemanticDiagram): DiagramHandle {
    const definitions = this.frssModeler.getDefinitions();

    if (definitions === undefined) {
      throw new Error('Cannot load diagram definitions!');
    }

    // create a new Process / obtain an existing process for the new diagram
    const newBpmnProcess = this.bpmnFactory.create(
      'bpmn:Process',
      currentProcess !== undefined ? {
        ...currentProcess,
        id: `${currentProcess.id}_EvidenceView`,
      } : {},
    );

    newBpmnProcess.$parent = definitions;

    // create a new plane for the process
    const diPlane = this.bpmnFactory.create('bpmndi:BPMNPlane', {
      bpmnElement: newBpmnProcess,
    });

    // create a new diagram
    const diDiagram = this.bpmnFactory.create('bpmndi:BPMNDiagram', {
      plane: diPlane,
    });

    // set the diagram as the parent for the plane
    diPlane.$parent = diDiagram;
    diDiagram.$parent = definitions;

    // bpmn-js team's TypeScript support is still somewhat in the "beta" stage.
    // @ts-expect-error
    definitions.diagrams.push(diDiagram);

    newBpmnProcess.children = [];
    // create a root element
    const newRootElement = this.elementFactory.createRoot({
      id: newBpmnProcess.id,
      // parent: this.frssModeler.getDefinitions(),
      type: newBpmnProcess.$type,
      di: diPlane,
      businessObject: newBpmnProcess,
      collapsed: false,
    });

    // console.log(newRootElement);

    this.canvas.addRootElement(newRootElement);
    // this.canvas.setRootElement(newRootElement);
    // this.canvas.setRootElement(this.diagramState.diagram);

    return { diPlane, rootElement: newRootElement };
  }

  createNewNormalDiagram() {
    const newDiagram = this.createEmptyDiagram();

    const newDiagramState: DiagramState = {
      diagram: newDiagram,
      type: FrssDiagramType.Normal,
      frssDiagrams: [],
    };

    // store the new normal diagram
    this.diagrams.set(newDiagram.rootElement.id, newDiagramState);
    this.diagramState = newDiagramState;
    this.createNewEvidenceDiagram();

    // we want to also open the diagram
    this.openDiagram();
  }

  private openDiagram() {
    this.canvas.setRootElement(this.diagramState.diagram.rootElement);
  }

  switchToEvidenceDiagram() {
    // we want to change to a different diagram
    if (!isNormalDiagram(this.diagramState)) return;

    // find if the diagram exists
    const evidenceDiagram = this.diagramState.frssDiagrams.find(
      (diagram) => diagram.type === FrssDiagramType.EvidenceDiagram,
    );

    if (evidenceDiagram === undefined) {
      throw new Error('The evidence view diagram does not exist!');
    }

    // set new state to the found evidence view diagram
    this.diagramState = evidenceDiagram;

    // set the viewer mode to evidence view
    this.frssModeProvider.mode = FrssMode.EvidenceView;
    this.openDiagram();

    // @ts-expect-error
    // eslint-disable-next-line no-underscore-dangle
    this.palette._update();
  }

  private createNewEvidenceDiagram() {
    // get current diagram root elemen
    const currentDiagram = this.diagramState.diagram.rootElement;

    // find current root
    const currentRoot = currentDiagram;

    const newEvidenceViewDiagram = this.createEmptyDiagram(currentRoot);

    // we can create a new diagram only if the state is a normal diagram
    // that will be linked to the evidence diagram
    if (!isNormalDiagram(this.diagramState)) {
      throw new Error(
        'The diagram is not in the correct mode'
        + ' to create a new evidence diagram',
      );
    }

    // add the new diagram to the state
    this.diagramState.frssDiagrams.push({
      diagram: newEvidenceViewDiagram,
      baseDiagramId: currentDiagram.id,
      type: FrssDiagramType.EvidenceDiagram,
    });

    return newEvidenceViewDiagram;
  }

  switchToNormalDiagram() {
    if (!isFrssDiagram(this.diagramState)) return;

    const normalDiagram = this.diagrams.get(this.diagramState.baseDiagramId);

    if (normalDiagram === undefined) {
      throw new Error('Base diagram does not exist!');
    }

    // set the mode back to normal diagram
    this.diagramState = normalDiagram;

    // set the normal mode
    this.frssModeProvider.mode = FrssMode.Normal;
    this.openDiagram();

    this.palette.update();
  }

  getAssociatedEvidenceDiagram() {
    const currentState = this.diagramState;

    if (isFrssDiagram(currentState)) {
      if (currentState.type === FrssDiagramType.EvidenceDiagram) {
        return currentState.diagram;
      }

      /**
       * This piece of code is commented-out for future purposes
       */
      // // find associated diagram
      // const mainDiagram = this.diagrams.get(currentState.baseDiagramId);

      // if (!mainDiagram) {
      //   throw new Error('Main diagram cannot be accessed!');
      // }
      // const evidenceDiagram = mainDiagram?.frssDiagrams.find(
      //   (diagram) => diagram.type === FrssDiagramType.EvidenceDiagram,
      // );

      // if (evidenceDiagram === undefined) {
      //   throw new Error('Evidence diagram cannot be accessed');
      // }

      // return this.getDiagramWithId(evidenceDiagram.id);
    }

    if (isNormalDiagram(this.diagramState)) {
      const evidenceDiagram = this.diagramState.frssDiagrams.find(
        (diagram) => diagram.type === FrssDiagramType.EvidenceDiagram,
      );

      if (evidenceDiagram === undefined) {
        throw new Error('Associated evidence diagram cannot be found');
      }

      // @ts-ignore
      return evidenceDiagram.diagram;
    }

    throw new Error('Unsupported diagram mode!');
  }

  getAssociatedMainDiagram() {
    const currentState = this.diagramState;

    if (isFrssDiagram(currentState)) {
      const baseDiagram = this.diagrams.get(currentState.baseDiagramId);

      if (baseDiagram === undefined) {
        throw new Error('Normal (base) diagram cannot be found');
      }

      return baseDiagram.diagram;
    }

    if (isNormalDiagram(currentState)) {
      return currentState.diagram;
    }

    throw new Error('Unsupported diagram mode!');
  }

  // async removeDiagram(id: string) {
  //   // remove the diagram and its related diagrams
  // }

  // async changeDiagram(id: string) {
  //   // switch the diagram to an existing one
  // }

  getDiagramList() {
    return [...this.diagrams.keys()];
  }
}
