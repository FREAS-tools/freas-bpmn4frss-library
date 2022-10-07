// This file provides functions for the React components
// that encapsulate the library

// imports
// @ts-ignore
import Modeler from 'bpmn-js/lib/Modeler';

// import the bpmn4frss moddle language extension
import frssExtension from '../frss-extension';
import errorMessages from './errors';

/**
 * A class which encapsulates the interaction
 * between React components and BPMN4FRSS library
 */
export default class Bpmn4FrssWebEditor {
  modeler: any;

  /**
   * Initialize a new BPMN4FRSS editor
   * @param {*} container - reference to the container for
   *                        `bpmn-js` to boostrap into
   * @constructor
   */
  constructor(container: any) {
    // initialize the Bpmn4frss modeler
    this.modeler = new Modeler({
      container,
      // extending the syntax of the language - able to serialize / deserialize
      // bpmn models from / to .bpmn files
      moddleExtensions: {
        frss: frssExtension.frssDefinitions,
      },

      // here are all additional modeler extensions
      additionalModules: [
        // extending the rendering abilities of the modeler:
        frssExtension,
      ],
    });
  }

  /**
   * Load diagram into the modeler
   * @param {string} content content of the diagram file (XML)
   * @throws when importing the XML diagram fails
   * @returns {Promise<boolean>} promised true on success
   */
  async loadDiagram(content: string): Promise<boolean> {
    if (!content) {
      throw new Error(errorMessages.noFileProvided);
    }

    // try to import the file's content into the modeler,
    // throw an error if the content cannot be loaded
    try {
      await this.modeler.importXML(content);
      return true;
    } catch (_) {
      throw new Error(errorMessages.fileLoadFailed);
    }
  }
}
