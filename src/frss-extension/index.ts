import {
  FrssMultipleDiagramProvider,
  FrssDiagramSynchrozationProvider,
} from './services/diagram';
import FrssDefinitions from './services/moddle';
import FrssModeProvider from './services/mode/mode';
import FrssPadProvider from './services/pad/padProvider';
import FrssPalette from './services/palette/palette';
import FrssPaletteProvider from './services/palette/paletteProvider';
import FrssPropertiesPanelProvider from './services/propertiesPanel';
import FrssRenderer from './services/renderer/renderer';
import FrssRuleProvider from './services/rules/ruleProvider';
import FrssRules from './services/rules/rules';

/**
 * FRSS extension for `bpmn-js`
 *
 * The library consists of a custom renderer, rule provider, moddle definitions
 * of the FRSS language extension,
 */
export default {
  __init__: [
    'frssRenderer',
    'frssPaletteProvider',
    'frssPadProvider',
    'bpmnRules',
    'frssRuleProvider',
    'frssMultipleDiagramProvider',
    'frssPropertiesPanelProvider',
    'frssDiagramSynchronizationProvider',
    'frssModeProvider',
    'palette',
  ],

  frssRenderer: ['type', FrssRenderer],
  frssPaletteProvider: ['type', FrssPaletteProvider],
  frssPadProvider: ['type', FrssPadProvider],
  bpmnRules: ['type', FrssRules],
  frssRuleProvider: ['type', FrssRuleProvider],
  frssMultipleDiagramProvider: ['type', FrssMultipleDiagramProvider],
  frssPropertiesPanelProvider: ['type', FrssPropertiesPanelProvider],
  frssDiagramSynchronizationProvider: [
    'type',
    FrssDiagramSynchrozationProvider,
  ],
  frssModeProvider: ['type', FrssModeProvider],
  palette: ['type', FrssPalette],

  // Moddle definitions should be imported with the library itself,
  // but they should not be initialized by the dependency injector.
  // (dependency injector for additional modules cannot handle this module)
  frssDefinitions: FrssDefinitions,
};

/**
 * Named exports allow this library to be used in conjunction with another
 * `bpmn-js` based library. The difference from the default export
 * of this module is that it allows developers to create a custom extensions
 * which can include BPMN4FRSS extension together with other extensions.
 * for that reason, it might be benefitial to create a custom module for the
 * `bpmn-js` library, which these named exports allow.
 */
export {
  FrssDefinitions as Bpmn4FrssDefinitions,
  FrssRenderer as Bpmn4FrssRenderer,
  FrssPaletteProvider as Bpmn4FrssPaletteProvider,
  FrssPalette as Bpmn4FrssPalette,
  FrssPadProvider as Bpmn4FrssPadProvider,
  FrssRuleProvider as Bpmn4FrssRuleProvider,
  FrssRules as Bpmn4FrssRules,
  FrssMultipleDiagramProvider as Bpmn4FrssMultipleDiagramProvider,
  FrssDiagramSynchrozationProvider as Bpmn4FrssDiagramSynchronizationProvider,
  FrssPropertiesPanelProvider as Bpmn4FrssPropertiesPanelProvider,
};
