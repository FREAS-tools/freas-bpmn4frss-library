/**
 * Adding multiple diagram support
 */
import { FrssMode } from '../../../editor/types/mode';
import { isFrssDiagram, isNormalDiagram, FrssDiagramType } from './types';

import type {
  DiagramHandler,
  DiagramState,
} from './types';
import type FrssModeler from '../../../editor';

export default class FrssMultipleDiagramProvider {
  static $inject: string[] = [
    'bpmnjs',
    'bpmnFactory',
    'canvas',
    'elementFactory',
  ];

  private bpmnFactory: any;

  private canvas: any;

  private diagramState: DiagramState;

  private diagrams: DiagramHandler;

  private elementFactory: any;

  private frssModeler: FrssModeler;

  constructor(
    frssModeler: FrssModeler,
    bpmnFactory: any,
    canvas: any,
    elementFactory: any,
  ) {
    // initial value is not defined, this is just a dummy value
    // rather than dealing with `undefined`
    this.diagramState = {
      frssDiagrams: [],
      id: '',
      type: FrssDiagramType.Normal,
    };

    this.frssModeler = frssModeler;
    // diagram state handler
    this.diagrams = new Map();
    this.bpmnFactory = bpmnFactory;
    this.canvas = canvas;
    this.elementFactory = elementFactory;
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

      // @ts-expect-error
      const { id } = definitions.diagrams[0];

      if (id === undefined) {
        throw new Error('No diagrams available!');
      }

      // create the correct initial state
      const diagramState: DiagramState = {
        id,
        frssDiagrams: [],
        type: FrssDiagramType.Normal,
      };

      // set the state
      this.diagramState = diagramState;

      // save the diagram state for later tracking
      this.diagrams.set(id, diagramState);

      // create an associated evidence diagram for the "regular"
      // (normal) diagram
      this.createNewEvidenceDiagram();
    }
  }

  reset() {
    // clear saved diagrams
    this.diagrams.clear();
    // create an initial state
    this.setInitialDiagramState();
  }

  private createEmptyDiagram(currentProcess?: any): { id: string } {
    // create a new Process / obtain an existing process for the new diagram
    const bpmnElement = this.bpmnFactory.create(
      'bpmn:Process',
      currentProcess !== undefined ? {
        id: currentProcess.id,
      } : {},
    );

    // create a new plane for the process
    const diPlane = this.bpmnFactory.create('bpmndi:BPMNPlane', {
      bpmnElement,
    });

    // set the plane's `di` to correct `di` element (freshly created one)
    diPlane.bpmnElement.di = diPlane.id;

    // create a new diagram
    const diDiagram = this.bpmnFactory.create('bpmndi:BPMNDiagram', {
      plane: diPlane,
    });

    // set the diagram as the parent for the plane
    diPlane.$parent = diDiagram;
    // set the definitions as the parent for the businessObject
    diPlane.bpmnElement.$parent = this.frssModeler.getDefinitions();
    diDiagram.$parent = this.frssModeler.getDefinitions();

    // add diagram to the diagrams collection
    const definitions = this.frssModeler.getDefinitions();

    if (definitions === undefined) {
      throw new Error('Cannot load diagram definitions!');
    }

    // bpmn-js team's type support is still somewhat in the "beta".
    // @ts-expect-error
    definitions.diagrams.push(diDiagram);

    // TODO: add the diagram as the new root element
    // this.canvas.

    return diDiagram;
  }

  /**
   * Idea of this code is borrowed from:
   * @link https://github.com/bpmn-io/bpmn-js/blob/v13.0.2/lib/features/modeling/behavior/SubProcessPlaneBehavior.js#L531
   */
  async createNewNormalDiagram() {
    const bpmnDiagram = this.createEmptyDiagram();

    const newDiagramState: DiagramState = {
      id: bpmnDiagram.id,
      type: FrssDiagramType.Normal,
      frssDiagrams: [],
    };

    // store the new normal diagram
    this.diagrams.set(newDiagramState.id, newDiagramState);
    this.diagramState = newDiagramState;
    this.createNewEvidenceDiagram();

    // we want to also open the diagram
    await this.openDiagram();
  }

  private async openDiagram() {
    await this.frssModeler.open(this.diagramState.id);
  }

  async switchToEvidenceDiagram() {
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
    this.frssModeler.setDiagramMode(FrssMode.EvidenceMode, this);
    await this.openDiagram();
  }

  private createNewEvidenceDiagram() {
    // get current diagram root element
    // @ts-expect-error
    const currentDiagram = this.frssModeler.getDefinitions().diagrams.find(
      (diagram: any) => diagram.id === this.diagramState.id,
    );

    if (currentDiagram === undefined) {
      throw new Error(
        'Current diagram does not exist! (Implementation error)',
      );
    }

    // find current root
    const currentRoot = currentDiagram.plane.bpmnElement;

    const bpmnDiagram = this.createEmptyDiagram(currentRoot);

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
      id: bpmnDiagram.id,
      baseDiagramId: this.diagramState.id,
      type: FrssDiagramType.EvidenceDiagram,
    });

    return bpmnDiagram;
  }

  async switchToNormalDiagram() {
    if (!isFrssDiagram(this.diagramState)) return;

    const normalDiagram = this.diagrams.get(this.diagramState.baseDiagramId);

    if (normalDiagram === undefined) {
      throw new Error('Base diagram does not exist!');
    }

    // set the mode back to normal diagram
    this.diagramState = normalDiagram;

    // set the normal mode
    this.frssModeler.setDiagramMode(FrssMode.Normal, this);
    await this.openDiagram();
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
