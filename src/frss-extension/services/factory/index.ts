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

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const elementPrefix = `${(element.$type ?? '').replace(/^[^:]*:/g, '')}_`;
    // eslint-disable-next-line no-param-reassign
    element.id = this.moddle.ids.nextPrefixed(elementPrefix, element);
  }
}
