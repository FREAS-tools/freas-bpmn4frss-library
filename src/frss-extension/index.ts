import {
  FrssMultipleDiagramProvider,
  FrssDiagramSynchrozizer,
} from './extensions/diagram';
import FrssDefinitions from './extensions/moddle/moddle';
import FrssModeProvider from './extensions/mode/mode';
import FrssPadProvider from './extensions/pad/padProvider';
import FrssPaletteProvider from './extensions/palette/paletteProvider';
import FrssRenderer from './extensions/renderer/renderer';
import FrssRuleProvider from './extensions/rules/ruleProvider';
import FrssRules from './extensions/rules/rules';

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
    'frssDiagramSynchronizer',
    'frssModeProvider',
  ],

  frssRenderer: ['type', FrssRenderer],
  frssPaletteProvider: ['type', FrssPaletteProvider],
  frssPadProvider: ['type', FrssPadProvider],
  bpmnRules: ['type', FrssRules],
  frssRuleProvider: ['type', FrssRuleProvider],
  frssMultipleDiagramProvider: ['type', FrssMultipleDiagramProvider],
  frssDiagramSynchronizer: ['type', FrssDiagramSynchrozizer],
  frssModeProvider: ['type', FrssModeProvider],

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
  FrssPadProvider as Bpmn4FrssPadProvider,
  FrssRuleProvider as Bpmn4FrssRuleProvider,
  FrssRules as Bpmn4FrssRules,
};
