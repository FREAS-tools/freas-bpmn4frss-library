/* eslint-disable no-underscore-dangle */
// @ts-ignore
import BpmnFactory from 'bpmn-js/lib/features/modeling/BpmnFactory';
import {
  isAny,
// @ts-ignore
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import frssElements from '../../elements';

const frssNeedsId = (element: any) => isAny(
  element,
  frssElements.filter(
    (frssElement) => (frssElement.properties.needsId === true),
  ).map((frssElement) => frssElement.properties.identifier),
);

/**
 * Modifies the original bpmn factory and adds support for elements
 * that need ID, but they were not getting one with the original implementation
 */
export default class FrssFactory extends BpmnFactory {
  static $inject: string[] = ['moddle'];

  moddle: any;

  constructor(moddle: any) {
    super(moddle);
    this.moddle = moddle;
  }

  // eslint-disable-next-line no-underscore-dangle
  _needsId(element: { $type: string | undefined, id: string | undefined }) {
    // eslint-disable-next-line no-underscore-dangle
    return frssNeedsId(element) || super._needsId(element);
  }

  _ensureId(element: any) {
    const frssId = frssNeedsId(element);

    if (!frssId) {
      super._ensureId(element);
    }

    // this code is borrowed from the original BpmnFactory implementation

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const elementPrefix = `${(element.$type ?? '').replace(/^[^:]*:/g, '')}_`;
    // eslint-disable-next-line no-param-reassign
    element.id = this.moddle.ids.nextPrefixed(elementPrefix, element);
  }
}
