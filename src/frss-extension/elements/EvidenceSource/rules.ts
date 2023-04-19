// @ts-ignore
import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';

import producesProperties from '../Produces/properties';
import properties from './properties';

// types
import type { ElementRules } from '../../types/rules';

const evidenceSourceIdentifier = properties.identifier;

const checkAttachmentOrCreation = (shape: any, _target: any): boolean => (
  is(shape, evidenceSourceIdentifier)
);

// what elements can we attach the potential evidence source to
const attachableTo: string[] = [
  'bpmn:Task', 'bpmn:Event', 'bpmn:DataStoreReference',
];

const rules: ElementRules = {
  attachmentRule: (source, target) => {
    // evidence source can attach to tasks, events, and data store references
    if (is(source, evidenceSourceIdentifier)) {
      if (isAny(target, attachableTo)) {
        return 'attach';
      }
      return false;
    }
  },
  connectionRule: (source, target, connectionId?) => {
    // handle should be reversed when the target is the evidence source identifier
    if (is(target, evidenceSourceIdentifier)) return false;

    // then if the source is not the evidence source identifier
    if (!is(source, evidenceSourceIdentifier)) return;

    // find the connection that is of type Produces.
    const producesConnections = source.outgoing.find((element: any) => (
      element.source.id === source.id
      && element.target.id === target.id
      && is(element, producesProperties.identifier)
    ));

    // we check for existing connection if we wish to create a new element
    // and we check for identity if we want to move the element
    // (by comparing connection id).
    const checkExisting = connectionId === undefined
      ? producesConnections === undefined
      : producesConnections.id === connectionId;

    // if the target is the DataObjectReference which is marked as the
    // potential evidence.
    if (
      is(target, 'bpmn:DataObjectReference')
      && target.businessObject?.dataObjectRef?.isPotentialEvidence
      && checkExisting
    ) {
      return {
        type: producesProperties.identifier,
      };
    }

    // otherwise it should not have occurred
    return false;
  },
  creationRule: (source, target) => (
    is(source, evidenceSourceIdentifier)
      && isAny(target, attachableTo)
  ),
  shouldCheckAttachment: checkAttachmentOrCreation,
  shouldCheckCreation: checkAttachmentOrCreation,
  shouldCheckConnection: (source, target) => (
    is(source, evidenceSourceIdentifier) || is(target, evidenceSourceIdentifier)
  ),
};

export default rules;
