// @ts-expect-error
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import dataTransformationProperties from '../DataTransformation/properties';
import frTaskProperties from '../properties';
import elementHasCorrectInputOutputAssociations from './common';
import type { PadEntryData } from '../../../types/controls';
import type {
  CreateActionHandler,
} from '../../../types/controls/actionHandler';

const markDataTransformation: CreateActionHandler = (
  { modeling, bpmnFactory },
  _properties,
) => (
  (_event, element) => {
    const { businessObject } = element;
    const ioAssociations = elementHasCorrectInputOutputAssociations(element);

    if (
      businessObject.isDataTransformation !== undefined
      || ioAssociations === undefined
    ) return;

    // create a new `DataTransformation` object
    const dataTransformation = bpmnFactory.create(
      dataTransformationProperties.identifier,
    );

    // assign the new object into the existing one
    businessObject.isDataTransformation = dataTransformation;
    modeling.updateProperties(element, {
      isDataTransformation: dataTransformation,
    });
  }
);

const unmarkDataTransformation: CreateActionHandler = (
  { modeling },
  _properties,
) => (
  (_event, element) => {
    const { businessObject } = element;
    const ioAssociations = elementHasCorrectInputOutputAssociations(element);

    if (
      businessObject.isDataTransformation === undefined
      || ioAssociations === undefined
    ) return;

    modeling.removeElements(businessObject.isDataTransformation);
    delete businessObject.isDataTransformation;

    modeling.updateProperties(element, {
      isDataTransformation: undefined,
    });
  }
);

const elementIsMarkedAsDataTransformation = (element: any) => (
  element
    ?.businessObject?.isDataTransformation !== undefined
);

const dataTransformationControls: PadEntryData[] = [
  // mark task as data transformation
  {
    show: (element) => (
      is(element, frTaskProperties.identifier)
      && !elementIsMarkedAsDataTransformation(element)
    ),
    makeActionHandler: markDataTransformation,
    props: {
      className: (
        `set set--${dataTransformationProperties.nameLowercase}`
      ),
      group: 'transformation',
      key: `set.${dataTransformationProperties.identifier}`,
      title: 'Mark as data transformation',
    },
  },
  // unmark task as data transformation
  {
    show: (element) => (
      is(element, frTaskProperties.identifier)
      && elementIsMarkedAsDataTransformation(element)
    ),
    makeActionHandler: unmarkDataTransformation,
    props: {
      className: (
        `unset unset--${dataTransformationProperties.nameLowercase}`
      ),
      group: 'transformation',
      key: `unset.${dataTransformationProperties.identifier}`,
      title: 'Unmark as data transformation',
    },
  },
];

export default dataTransformationControls;
