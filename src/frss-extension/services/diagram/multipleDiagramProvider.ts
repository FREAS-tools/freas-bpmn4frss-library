/**
 * Adding multiple diagram support
 */
import {
  type DiagramStateHandler,
  type DiagramState,
  type MultipleDiagramProviderContext,
  isNormalDiagram,
  FrssEvidenceViewDiagram,
  isFrssDiagram,
} from '../../types/diagrams';
import FrssModeProvider, { FrssMode } from '../mode/mode';
import {
  instanciateDiagramStates,
} from './createOrLoadNewDiagram';
import type FrssModeler from '../../../modeler';

import type FrssPalette from '../palette/palette';

export default class FrssMultipleDiagramProvider {
  static $inject: string[] = [
    'bpmnjs',
    'bpmnFactory',
    'canvas',
    'elementFactory',
    'frssModeProvider',
    'palette',
  ];

  private bpmnFactory: any;

  private canvas: any;

  private diagramState: DiagramState;

  private diagramStateHandler: DiagramStateHandler;

  private elementFactory: any;

  private frssModeler: FrssModeler;

  private frssModeProvider: FrssModeProvider;

  private palette: FrssPalette;

  constructor(
    frssModeler: FrssModeler,
    bpmnFactory: any,
    canvas: any,
    elementFactory: any,
    frssModeProvider: FrssModeProvider,
    palette: FrssPalette,
  ) {
    // initial value is not defined, this is just a dummy value
    // rather than dealing with `undefined`
    this.diagramState = {
      diagram: {
        id: '',
        children: [],
        parent: undefined,
        di: undefined,
      },
      frssDiagrams: [],
      type: 'normal',
    };

    this.frssModeler = frssModeler;
    this.frssModeProvider = frssModeProvider;

    // diagram state handler
    this.diagramStateHandler = new Map();
    this.bpmnFactory = bpmnFactory;
    this.elementFactory = elementFactory;
    this.canvas = canvas;
    this.palette = palette;
  }

  private context(): MultipleDiagramProviderContext {
    return {
      bpmnFactory: this.bpmnFactory,
      canvas: this.canvas,
      diagramStateHandler: this.diagramStateHandler,
      elementFactory: this.elementFactory,
      frssModeProvider: this.frssModeProvider,
      frssModeler: this.frssModeler,
      palette: this.palette,
    };
  }

  /**
   * This method is called only once per import - after importing a diagram
   */
  reset() {
    this.diagramStateHandler.clear();

    // instanciate the diagram state handler and set the initial set
    this.diagramState = instanciateDiagramStates(
      this.context(),
    );
  }

  // createNewRegularDiagram() {
  //   this.diagramState = createNewRegularDiagramAndAssociatedDiagrams(
  //     this.context(),
  //   );
  // }

  private openDiagram() {
    this.canvas.setRootElement(this.diagramState.diagram);
  }

  switchToEvidenceDiagram() {
    // we want to change to a different diagram
    if (!isNormalDiagram(this.diagramState)) return;

    // find if the diagram exists
    const evidenceDiagram = this.diagramState.frssDiagrams.find(
      (diagram) => diagram.type === FrssEvidenceViewDiagram,
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

  switchToNormalDiagram() {
    if (isNormalDiagram(this.diagramState)) return;

    const normalDiagram = this.diagramStateHandler.get(
      this.diagramState.baseDiagramId,
    );

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
      if (currentState.type === FrssEvidenceViewDiagram) {
        return currentState.diagram;
      }
    }

    if (isNormalDiagram(this.diagramState)) {
      const mainDiagram = this.diagramState.frssDiagrams.find(
        (diagram) => diagram.type === FrssEvidenceViewDiagram,
      );

      if (mainDiagram === undefined) {
        throw new Error('Associated evidence diagram cannot be found');
      }

      return mainDiagram.diagram;
    }

    throw new Error('Unsupported diagram mode!');
  }

  getAssociatedMainDiagram() {
    const currentState = this.diagramState;

    if (isFrssDiagram(currentState)) {
      const baseDiagram = this.diagramStateHandler.get(
        currentState.baseDiagramId,
      );

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
    return [...this.diagramStateHandler.keys()];
  }
}
