import authenticityComputationProperties
  from
  '../../../derivedElements/Computation/AuthenticityComputation/properties';
import { FrssTaskToggleComponent } from '../common';

const AuthenticityComputationPanelToggleSwitch = (
  props: { element: any },
) => FrssTaskToggleComponent({
  id: 'authenticity-computation',
  identifier: authenticityComputationProperties.identifier,
  element: props.element,
  moddlePropertyName: 'isAuthenticityComputation',
  switcherLabelName: 'Authenticity Computation',
});

export default AuthenticityComputationPanelToggleSwitch;
