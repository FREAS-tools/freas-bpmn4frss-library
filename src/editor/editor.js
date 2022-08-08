// This file provides functions for the React components
// that encapsulate the library

// imports
import Modeler from 'bpmn-js';
import errorMessages from '../errors/messages';

/**
 * A class which encapsulates the interaction
 * between React components and BPMN4FRSS library
 */
class Bpmn4FrssEditor {
  /**
   * Initializes a new BPMN4FRSS editor
   * @constructor
   * @param {string} id - the unique id of the element,
   *                      provided to us by the React (or any other frontend
   *                      library / framework) wrapper component
   * @throws when id is not provided
   */
  constructor(id) {
    // The id has not been provided
    if (!id) {
      throw new Error(errorMessages.Bpmn4FrssEditorErrors.noIdProvided);
    }

    // initialize the Bpmn4frss modeler
    this.modeler = new Modeler({ container: `#${id}` });
  }

  /**
   * Load diagram into the modeler
   * @param {string} content - content of the diagram file (XML)
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

  /**
   * Testing
   * @param {number} something lol
   */
  tryme(something) {
    console.log(`${something}will there be a type definition?`, this);
  }
}

export default Bpmn4FrssEditor;
