/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
// type checking inside bpmn-js
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import { FRSS_PRIORITY } from '../../common';

// Custom elements - every custom element is placed in this list
import {
  frssRenderables,
  frssRenderableShapes,
  frssRenderableConnections,
} from '../../elements';

// types
import type { FrssRenderable } from '../../types';
import type { Shape, Connection } from 'diagram-js/lib/model';

const NOT_FRSS_RENDERABLE_ERROR = new Error(
  'The element is not renderable by the FRSS renderer',
);

export default class FrssRenderer extends BaseRenderer {
  bpmnRenderer: BaseRenderer;

  static $inject: string[] = [
    'eventBus',
    'bpmnRenderer',
  ];

  /**
   * Instantiate the custom BPMN4FRSS renderer
   * @param {EventBus} eventBus for subscribing to the event bus
   *                            and firing the renderer
   * @param {*} bpmnRenderer renderer as an argument, saves the reference
   *                         to the original renderer
   * (@link https://github.com/bpmn-io/bpmn-js-example-custom-rendering/blob/master/app/custom/CustomRenderer.js )
   */
  constructor(eventBus: any, bpmnRenderer: any) {
    super(eventBus, FRSS_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }

  /**
   * Decide which elements to render in a custom manner (usually)
   * @param {element} element element that needs to be rendered
   *
   * @returns true if the element is custom, false otherwise
   */
  canRender(element: any) {
    // modified bpmn elements that should be rendered differently
    const shouldRender = frssRenderables.flatMap(
      (customElement) => customElement.rendererEntry,
    ).find((rendererEntry) => rendererEntry.shouldRender(element));

    return shouldRender !== undefined;
  }

  /**
   * Logic for displaying custom elements.
   *
   * `drawShape` works as follows:
   * If it returns a value (rendered element), then the element is rendered by
   * the renderer the function is specified in. Otherwise, rendering duty gets
   * passed to a renderer with a lower priority.
   *
   * @param {element} parentNode parent node of the element that needs to be rendered
   * @param {element} element element that is getting rendered
   *
   * @returns - rendered element if the element is custom
   *          - null otherwise
   */
  drawShape(parentNode: SVGElement, element: Shape): SVGElement {
    // check if the element is a custom frss renderable element
    // only retains the one custom element it matches
    const elementIsFrssRenderable:
    (FrssRenderable | undefined) = frssRenderableShapes.find(
      (renderableElement) => (
        renderableElement.rendererEntry.shouldRender(element)),
    );

    // the element is not renderable by the Frss renderer
    if (!elementIsFrssRenderable) throw NOT_FRSS_RENDERABLE_ERROR;

    // obtain the renderer from the custom element module
    // there will always be just one module with the same identifier
    const { rendererEntry } = elementIsFrssRenderable;

    return rendererEntry.renderFunction({
      bpmnRenderer: this.bpmnRenderer,
      element,
      parentNode,
    });
  }

  drawConnection(parentNode: SVGElement, element: Connection): SVGElement {
    const elementIsFrssRenderableConnection:
    (FrssRenderable | undefined) = frssRenderableConnections.find(
      (renderableConnection) => (
        renderableConnection.rendererEntry.shouldRender(element)
      ),
    );

    // the connection is not renderable by the Frss renderer
    if (!elementIsFrssRenderableConnection) throw NOT_FRSS_RENDERABLE_ERROR;

    const { rendererEntry } = elementIsFrssRenderableConnection;

    return rendererEntry.renderFunction({
      bpmnRenderer: this.bpmnRenderer,
      element,
      parentNode,
    });
  }
}
