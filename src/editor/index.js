// This file provides functions for the React components
// that encapsulate the library

// imports
import Modeler from 'bpmn-js';
import errorMessages from '../errors/messages';

// import the bpmn4frss moddle language extension
import { bpmn4frssModdle } from '../elements';

/**
 * A class which encapsulates the interaction
 * between React components and BPMN4FRSS library
 */
class Bpmn4FrssEditor {
  /**
   * Initializes a new BPMN4FRSS editor
   * @constructor
   * @param {string} id the unique id of the element,
   *                    provided to us by the React (or any other frontend
   *                    library / framework) wrapper component
   * @throws when id is not provided
   */
  constructor(id) {
    // The id has not been provided
    if (!id) {
      throw new Error(errorMessages.Bpmn4FrssEditorErrors.noIdProvided);
    }

    // initialize the Bpmn4frss modeler
    this.modeler = new Modeler({
      // modeler is placed in the container - can be dynamically attached
      // we'll figure this out -> which strategy is better
      // for the React components
      container: `#${id}`,
      // extending the syntax of the language - able to read / write bpmn models
      moddleExtensions: {
        bpmn4frss: bpmn4frssModdle,
      },
    });
  }

  /**
   * Load diagram into the modeler
   * @param {string} content content of the diagram file (XML)
   * @throws when importing the XML diagram fails
   */
  async loadDiagram(content) {
    if (!content) {
      throw new Error(errorMessages.Bpmn4FrssEditorErrors.noFileProvided);
    }

    // try to import the file's content into the modeler,
    // throw an error if the content cannot be loaded
    try {
      await this.modeler.importXML(content);
    } catch (_) {
      throw new Error(errorMessages.Bpmn4FrssEditorErrors.fileLoadFailed);
    }
  }
}

export default Bpmn4FrssEditor;
