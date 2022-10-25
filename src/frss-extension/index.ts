import FrssPalette from './controls/palette';
import FrssDefinitions from './definitions';
import FrssRenderer from './renderer';

/**
 * FRSS extension for `bpmn-js`
 *
 * The library consists of a custom renderer, rule provider, moddle definitions
 * of the FRSS language extension,
 */
export default {
  __init__: [
    'frssRenderer',
    'frssPalette',
  ],

  frssRenderer: ['type', FrssRenderer],
  frssPalette: ['type', FrssPalette],

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
};