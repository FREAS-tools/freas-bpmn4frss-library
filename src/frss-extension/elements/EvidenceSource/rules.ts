// @ts-ignore
import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';

import { ElementRules } from '../../types/rules';
import potentialEvidence from '../PotentialEvidence';
import properties from './properties';

const evidenceSourceIdentifier = properties.identifier;

const rules: ElementRules = {
  attachmentRule: (source, target) => {
    if (is(source, evidenceSourceIdentifier) && isAny(target, [
      'bpmn:Task', 'bpmn:Event', 'bpmn:Event',
    ])) {
      return 'attach';
    }

    return false;
  },
  connectionRule: (source, target) => {
    // reverse handle
    if (is(target, evidenceSourceIdentifier)) return false;

    // we have the correct situation
    return {
      type: '', // @TODO: add Produces
    };
  },
  shouldCheckAttachment: (source, _target) => (
    is(source, evidenceSourceIdentifier)
  ),
  shouldCheckConnection: (source, target) => (
    // either we want the correct situation
    (
      is(source, evidenceSourceIdentifier)
      && is(target, potentialEvidence.properties.identifier)
      && target.businessObject?.dataObjectRef?.potentialEvidence
    )
    // or we want to reverse the handle
    || is(target, evidenceSourceIdentifier)
  ),
};

export default rules;
