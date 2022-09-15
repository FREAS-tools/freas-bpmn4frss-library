/*
 * Import of the individual element / language construct definitions
 *
 * Syntax:
 * import nameOfTheElement from './NameOfTheElement/definition';
 */

import { bpmn4frss } from '../common';
import PotentialEvidenceSource from '../elements/PotentialEvidenceSource';

/**
 * This file contains moddle definitions for the BPMN4FRSS extension.
 * Unlike in the extension tutorial for bpmn-js library,
 * we chose to use the JS objects directly, which allows us to write
 * the definitions in a modular way.
 *
 * To add a new language construct (/element) into the moddle definition:
 *
 * - create a definition.js file inside the construct's folder
 * - write the moddle definition there
 * - import it into the bpmn4frssModdle object in this file
 *
 * This will add the construct to the language and the library will be able
 * to handle the construct serialization and deserialization
 * into the underlying XML file (.bpmn).
 */
const FrssDefinitions = {
  // name of the extension
  name: 'BPMN for Forensic-Ready Software Systems',

  // prefix of the extension
  prefix: bpmn4frss,

  // uri for the schema (currently incorrect address)
  uri: 'http://fi.muni.cz/schema/bpmn/bpmn4frss',

  // XML details
  xml: {
    tagAlias: 'lowerCase',
  },

  // The definitions for language constructs belong here
  types: [
    PotentialEvidenceSource.definition,
  ],

  // these values are reserved for future use by the bpmn-js library
  associations: [],
  enumerations: [],
};

export default FrssDefinitions;
