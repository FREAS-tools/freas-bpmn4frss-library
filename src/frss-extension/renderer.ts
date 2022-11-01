/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
// type checking inside bpmn-js
// @ts-ignore
import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';

// @ts-ignore
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import { FRSS_PRIORITY } from './common';

// Custom elements - every custom element is placed in this list
import customElements from './customElements';

export default class FrssRenderer extends BaseRenderer {
  bpmnRenderer: unknown;

  static $inject: string[];

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
    // if you wish to add a new element to the renderer,
    // this list is the place to put the identifiers in
    return isAny(
      element,
      customElements.map(
        (customElement) => customElement.properties.identifier,
      ),
    );
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
  drawShape(parentNode: any, element: any): Element | null {
    // check if the element is a custom frss renderable element
    // only retains the one custom element it matches
    const elementIsFrssRenderable = customElements.filter(
      // compare element with its identifier and check if the render
      // function exists
      (customElement) => is(element, customElement.properties.identifier)
        && customElement.render,
    );

    if (elementIsFrssRenderable) {
      // obtain the renderer from the custom element module
      // there will always be just one module with the same identifier
      const { render } = elementIsFrssRenderable[0];

      if (render) return render(parentNode, element);
    }

    // the element was not custom or not renderable,
    // therefore return null and pass this to the default renderer
    return null;
  }
}

// we need to tell the dependency injector what dependencies we plan to
// use within our custom module
FrssRenderer.$inject = [
  'eventBus',
  'bpmnRenderer',
];
