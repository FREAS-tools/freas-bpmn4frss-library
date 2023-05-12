import dataTransformationProperties
  from '../../../DataTransformation/properties';
import FrssTaskComponent from '../common';

const DataTransformationPanelToggleSwitch = (
  props: { element: any },
) => FrssTaskComponent({
  id: 'data-transformation',
  identifier: dataTransformationProperties.identifier,
  element: props.element,
  moddlePropertyName: 'isDataTransformation',
  switcherLabelName: 'Data Transformation',
});

export default DataTransformationPanelToggleSwitch;
