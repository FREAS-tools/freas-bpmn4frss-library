// @ts-expect-error
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import integrityComputationProperties
  from '../Computation/IntegrityComputation/properties';
import frTaskProperties from '../properties';
import elementHasCorrectInputOutputAssociations from './common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';

const markIntegrityComputation: CreateActionHandler = (
  { modeling, bpmnFactory },
  _properties,
) => (
  (_event, element) => {
    const { businessObject } = element;

    if (businessObject.isIntegrityComputation !== undefined) return;

    // create a new `IntegrityComputation` object
    const integrityComputation = bpmnFactory.create(
      integrityComputationProperties.identifier,
    );

    // assign the new object into the existing one
    businessObject.isIntegrityComputation = integrityComputation;
    modeling.updateProperties(element, {
      isIntegrityComputation: integrityComputation,
    });
  }
);

const unmarkIntegrityComputation: CreateActionHandler = (
  { modeling },
  _properties,
) => (
  (_event, element) => {
    const { businessObject } = element;

    if (businessObject.isIntegrityComputation === undefined) return;

    modeling.removeElements(businessObject.isIntegrityComputation);
    delete businessObject.isIntegrityComputation;

    modeling.updateProperties(element, {
      isIntegrityComputation: undefined,
    });
  }
);

const elementIsMarkedAsIntegrityComputation = (element: any) => (
  element
    ?.businessObject?.isIntegrityComputation !== undefined
);

const integrityComputationControls: PadEntryData[] = [
  // mark task as integrity computation
  {
    show: (element) => (
      is(element, frTaskProperties.identifier)
      && elementHasCorrectInputOutputAssociations(element)
      && !elementIsMarkedAsIntegrityComputation(element)
    ),
    makeActionHandler: markIntegrityComputation,
    props: {
      className: (
        `set set--${integrityComputationProperties.nameLowercase}`
      ),
      group: 'integrity',
      key: `set.${integrityComputationProperties.identifier}`,
      title: 'Mark as integrity computation',
    },
  },
  // unmark task as integrity computation
  {
    show: (element) => (
      is(element, frTaskProperties.identifier)
      && elementHasCorrectInputOutputAssociations(element)
      && elementIsMarkedAsIntegrityComputation(element)
    ),
    makeActionHandler: unmarkIntegrityComputation,
    props: {
      className: (
        `unset unset--${integrityComputationProperties.nameLowercase}`
      ),
      group: 'integrity',
      key: `unset.${integrityComputationProperties.identifier}`,
      title: 'Unmark as integrity computation',
    },
  },
];

export default integrityComputationControls;
