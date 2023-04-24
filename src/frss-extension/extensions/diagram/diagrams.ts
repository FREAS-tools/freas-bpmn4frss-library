/**
 * Adding multiple diagram support
 */
// @ts-ignore
import { is } from 'bpmn-js/lib/util/ModelUtil';

import { FrssMode } from '../../../editor/types/mode';
import type FrssModeler from '../../../editor';

type DiagramHandler = Map<string, NormalDiagram>;

enum FrssDiagramType {
  EvidenceDiagram = 'evidence-diagram',
  Normal = 'normal-diagram',
}

type DiagramState = NormalDiagram | FrssDiagram;

type NormalDiagram = {
  frssDiagrams: FrssDiagram[],
  id: string,
  type: FrssDiagramType.Normal,
};

type FrssDiagram = {
  baseDiagramId: string,
  id: string,
  type: Exclude<FrssDiagramType, FrssDiagramType.Normal>,
};

const isNormalDiagram = (
  diagramState: DiagramState,
): diagramState is NormalDiagram => {
  const isNormal = diagramState as NormalDiagram;

  return (
    Array.isArray(isNormal.frssDiagrams)
    && isNormal.type === FrssDiagramType.Normal
  );
};

const isFrssDiagram = (
  diagramState: DiagramState,
): diagramState is FrssDiagram => !isNormalDiagram(diagramState);

export default class FrssMultipleDiagramProvider {
  private bpmnFactory: any;

  private diagramState: DiagramState;

  private diagrams: DiagramHandler;

  private elementRegistry: any;

  private elementFactory: any;

  private frssModeler: FrssModeler;

  // private modeling: any;

  constructor(
    frssModeler: FrssModeler,
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
    this.elementFactory = this.frssModeler.get('elementFactory');
    this.bpmnFactory = this.frssModeler.get('bpmnFactory');
    this.elementRegistry = this.frssModeler.get('elementRegistry');
  }

  /**
   * This method is called only once and is set to initialize the
   * first diagram once the library loads.
   *
   * @param id id of the diagram
   * @param diagram the obtained diagram
   */
  setInitialDiagramState() {
    if (this.diagrams.size === 0) {
      const definitions = this.frssModeler.getDefinitions();

      if (definitions === undefined) {
        return new Error('The diagram has not been loaded yet.');
      }

      // @ts-ignore
      const { id } = definitions.diagrams[0];

      const diagramState: DiagramState = {
        id,
        frssDiagrams: [],
        type: FrssDiagramType.Normal,
      };

      this.diagramState = diagramState;

      this.diagrams.set(id, diagramState);

      this.createNewEvidenceDiagram();
    }
  }

  reset() {
    this.diagrams.clear();
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
    // @ts-ignore
    this.frssModeler.getDefinitions().diagrams.push(diDiagram);
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

    // get previous state
    const previousState = this.diagramState;
    // find if the diagram exists
    const evidenceDiagram = this.diagramState.frssDiagrams.find(
      (diagram) => diagram.type === FrssDiagramType.EvidenceDiagram,
    );

    // the diagram does not exist
    if (evidenceDiagram === undefined) {
      const currentProcess = this.elementRegistry.getAll().find(
        (element: any) => is(element, 'bpmn:Process'),
      );

      if (currentProcess === undefined) {
        throw new Error('Unimplemented: If the root element is not a process!');
      }

      // create a new diagram
      const newEvidenceDiagram = this.createNewEvidenceDiagram(
        currentProcess,
      );

      // set the new state
      const newDiagram: FrssDiagram = {
        id: newEvidenceDiagram.id,
        type: FrssDiagramType.EvidenceDiagram,
        baseDiagramId: previousState.id,
      };

      // associate the new diagram with the regular diagram
      this.diagramState.frssDiagrams.push(newDiagram);

      // update state
      this.diagramState = newDiagram;

      // set the viewer mode to evidence view
      this.frssModeler.diagramMode = FrssMode.EvidenceMode;
      await this.openDiagram();
      return;
    }

    // set new state to the found evidence view diagram
    this.diagramState = evidenceDiagram;

    // set the viewer mode to evidence view
    this.frssModeler.diagramMode = FrssMode.EvidenceMode;
    await this.openDiagram();
  }

  private createNewEvidenceDiagram() {
    // get current diagram root element
    // @ts-ignore
    const currentDiagram = this.frssModeler.getDefinitions().diagrams.find(
      (diagram: any) => diagram.id === this.diagramState.id,
    );

    if (currentDiagram === undefined) {
      throw new Error(
        'Current diagram does not exist! (Implementation error)',
      );
    }

    const currentRoot = currentDiagram.plane.bpmnElement;

    const bpmnDiagram = this.createEmptyDiagram(currentRoot);
    console.log(bpmnDiagram);
    console.log(currentRoot);

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
    this.frssModeler.diagramMode = FrssMode.Normal;
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
