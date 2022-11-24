// @ts-ignore
import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';

import { ElementRules } from '../../types/rules';
// import potentialEvidence from '../PotentialEvidence';
// import producesProperties from '../Produces/properties';
import properties from './properties';

const evidenceSourceIdentifier = properties.identifier;
// const producesIdentifier = producesProperties.identifier;

const checkAttachmentOrCreation = (source: any, _target: any): boolean => (
  is(source, evidenceSourceIdentifier)
);

// what elements can we attach the potential evidence source to
const attachable: string[] = [
  'bpmn:Task', 'bpmn:Event', 'bpmn:DataStoreReference',
];

const rules: ElementRules = {
  attachmentRule: (source: any, target: any) => {
    // evidence source can attach to tasks, events, and data store references
    if (is(source, evidenceSourceIdentifier) && isAny(target, attachable)) {
      return 'attach';
    }

    return false;
  },
  creationRule: (source, target) => (
    is(source, evidenceSourceIdentifier)
      && isAny(target, attachable)
  ),
  shouldCheckAttachment: checkAttachmentOrCreation,
  shouldCheckCreation: checkAttachmentOrCreation,
};

export default rules;