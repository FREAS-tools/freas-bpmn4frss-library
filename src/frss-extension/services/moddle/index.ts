/*
 * Import of the individual element / language construct definitions
 *
 * Syntax:
 * import nameOfTheElement from './NameOfTheElement/definition';
 */

import { bpmn4frss, type Bpmn4FrssPrefix } from '../../common';

// Custom elements - every custom element is placed in this list
import {
  frssSemanticElements,
  frssEnumerationElements,
} from '../../elements';
import type {
  FrssModdleEnumerationDefinition,
  FrssModdleSemanticDefinition,
} from '../../types/definitions';

type FrssModdleDefinitions = {
  associations: any[],
  enumerations: FrssModdleEnumerationDefinition[],
  name: string,
  prefix: Bpmn4FrssPrefix,
  types: FrssModdleSemanticDefinition[],
  uri: string,
  xml: {
    tagAlias: string,
  },
};

/**
 * This file contains moddle definitions for the BPMN4FRSS extension.
 * Unlike in the extension tutorial for bpmn-js library,
 * the TS objects were chosen directly, allowing writing
 * the definitions in a modular way.
 *
 * To add a new language construct (/element) into the moddle definition:
 *
 * - create a definition.ts file inside the construct's folder
 * - write the moddle definition there
 * - import it into the bpmn4frssModdle object in this file
 *
 * This will add the construct to the language and the library will be able
 * to handle the construct serialization and deserialization
 * into the underlying XML file (.bpmn).
 */
const FrssDefinitions: FrssModdleDefinitions = {
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
  types: frssSemanticElements.map(
    (customSemanticElement) => customSemanticElement.definition,
  ),

  // these values are reserved by the bpmn-js library
  associations: [],
  enumerations: frssEnumerationElements.map(
    (customEnumerationElement) => (
      customEnumerationElement.enumerationDefinition
    ),
  ),
};

export default FrssDefinitions;
