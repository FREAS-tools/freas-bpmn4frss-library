/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

// type checking
import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';

import { FRSS_PRIORITY } from '../common';

// Custom elements
import PotentialEvidenceSource from '../elements/PotentialEvidenceSource';

// Custom element modules
// Whenever you need to add a new element to the extension, just add its module
// to this list
const customElements = [
  PotentialEvidenceSource,
];

// extract identifiers of custom elements
const identifiers = customElements.map(
  (customElement) => customElement.identifier,
);

export default class FrssRenderer extends BaseRenderer {
  /**
   * Instantiate the custom BPMN4FRSS renderer
   * @param {EventBus} eventBus for subscribing to the event bus
   *                            and firing the renderer
   * @param {*} bpmnRenderer renderer as an argument, saves the reference
   *                         to the original renderer
   * (@link https://github.com/bpmn-io/bpmn-js-example-custom-rendering/blob/master/app/custom/CustomRenderer.js )
   */
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, FRSS_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }

  /**
   * Decide which elements to render in a custom manner (usually)
   * @param {element} element element that needs to be rendered
   *
   * @returns true if the element is custom, false otherwise
   */
  canRender(element) {
    // if you wish to add a new element to the renderer,
    // this list is the place to put the identifiers in
    return isAny(element, identifiers);
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
  drawShape(parentNode, element) {
    // check if the element is a custom element
    const elementIsCustom = customElements.filter(
      // compare element with its identifier
      (customElement) => is(element, customElement.identifier),
    );

    if (elementIsCustom) {
      // obtain the renderer from the custom element module
      // there will always be just one module with the same identifier
      const { render } = elementIsCustom[0];

      return render(parentNode, element);
    }

    return null;
  }
}

// @TODO: write why this is here
FrssRenderer.$inject = [
  'eventBus',
  'bpmnRenderer',
];
