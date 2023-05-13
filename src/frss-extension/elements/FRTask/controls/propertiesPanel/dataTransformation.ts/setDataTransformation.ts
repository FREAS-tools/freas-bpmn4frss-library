import dataTransformationProperties
  from '../../../derivedElements/DataTransformation/properties';
import { FrssTaskToggleComponent } from '../common';

const DataTransformationPanelToggleSwitch = (
  props: { element: any },
) => FrssTaskToggleComponent({
  id: 'data-transformation',
  identifier: dataTransformationProperties.identifier,
  element: props.element,
  moddlePropertyName: 'isDataTransformation',
  switcherLabelName: 'Data Transformation',
});

export default DataTransformationPanelToggleSwitch;
