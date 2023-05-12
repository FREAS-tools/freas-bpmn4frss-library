import integrityComputationProperties
  from '../../../Computation/IntegrityComputation/properties';
import FrssTaskComponent from '../common';

const IntegrityComputationPanelToggleSwitch = (
  props: { element: any },
) => FrssTaskComponent({
  id: 'integrity-computation',
  identifier: integrityComputationProperties.identifier,
  element: props.element,
  moddlePropertyName: 'isIntegrityComputation',
  switcherLabelName: 'Integrity Computation',
});

export default IntegrityComputationPanelToggleSwitch;
