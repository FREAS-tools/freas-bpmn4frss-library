import FrssCustomEvents from './extensions/events/events';
import FrssDefinitions from './extensions/moddle/moddle';
import FrssPadProvider from './extensions/pad/padProvider';
import FrssPaletteProvider from './extensions/palette/paletteProvider';
import FrssRenderer from './extensions/renderer/renderer';
import FrssRuleProvider from './extensions/rules/rules';

/**
 * FRSS extension for `bpmn-js`
 *
 * The library consists of a custom renderer, rule provider, moddle definitions
 * of the FRSS language extension,
 */
export default {
  __init__: [
    'frssEvents',
    'frssRenderer',
    'frssPaletteProvider',
    'frssPadProvider',
    'frssRuleProvider',
  ],

  frssEvents: ['type', FrssCustomEvents],
  frssRenderer: ['type', FrssRenderer],
  frssPaletteProvider: ['type', FrssPaletteProvider],
  frssPadProvider: ['type', FrssPadProvider],
  frssRuleProvider: ['type', FrssRuleProvider],

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
  FrssCustomEvents as Bpmn4FrssEvents,
  FrssDefinitions as Bpmn4FrssDefinitions,
  FrssRenderer as Bpmn4FrssRenderer,
  FrssPaletteProvider as Bpmn4FrssPaletteProvider,
  FrssPadProvider as Bpmn4FrssPadProvider,
};
