// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import authenticityComputationProperties
  from '../Computation/AuthenticityComputation/properties';
import frTaskProperties from '../properties';
import elementHasCorrectInputOutputAssociations from './common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';

const markAuthenticityComputation: CreateActionHandler = (
  { modeling, bpmnFactory },
  _properties,
) => (
  (_event, element) => {
    const { businessObject } = element;
    const ioAssociations = elementHasCorrectInputOutputAssociations(element);

    if (
      businessObject.isAuthenticityComputation !== undefined
      || ioAssociations === undefined
    ) return;

    // create a new `AuthenticityComputation` object
    const authenticityComputation = bpmnFactory.create(
      authenticityComputationProperties.identifier,
    );

    // assign the new object into the existing one
    businessObject.isAuthenticityComputation = authenticityComputation;
    modeling.updateProperties(element, {
      isAuthenticityComputation: authenticityComputation,
    });
  }
);

const unmarkAuthenticityComputation: CreateActionHandler = (
  { modeling },
  _properties,
) => (
  (_event, element) => {
    const { businessObject } = element;
    const ioAssociations = elementHasCorrectInputOutputAssociations(element);

    if (
      businessObject.isAuthenticityComputation === undefined
      || ioAssociations === undefined
    ) return;

    modeling.removeElements(businessObject.isAuthenticityComputation);
    delete businessObject.isAuthenticityComputation;

    modeling.updateProperties(element, {
      isAuthenticityComputation: undefined,
    });
  }
);

const elementIsMarkedAsAuthenticityComputation = (element: any) => (
  element
    ?.businessObject?.isAuthenticityComputation !== undefined
);

const authenticityComputationControls: PadEntryData[] = [
  // mark task as authenticity computation
  {
    show: (element) => (
      is(element, frTaskProperties.identifier)
      && !elementIsMarkedAsAuthenticityComputation(element)
    ),
    makeActionHandler: markAuthenticityComputation,
    props: {
      className: (
        `set set--${authenticityComputationProperties.nameLowercase}`
      ),
      group: 'authenticity',
      key: `set.${authenticityComputationProperties.identifier}`,
      title: 'Mark as authenticity computation',
    },
  },
  // unmark task as authenticity computation
  {
    show: (element) => (
      is(element, frTaskProperties.identifier)
      && elementIsMarkedAsAuthenticityComputation(element)
    ),
    makeActionHandler: unmarkAuthenticityComputation,
    props: {
      className: (
        `unset unset--${authenticityComputationProperties.nameLowercase}`
      ),
      group: 'authenticity',
      key: `unset.${authenticityComputationProperties.identifier}`,
      title: 'Unmark as authenticity computation',
    },
  },
];

export default authenticityComputationControls;
