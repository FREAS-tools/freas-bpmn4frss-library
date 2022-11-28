import React, { HtmlHTMLAttributes, MutableRefObject, useEffect, useRef, useState } from "react";
import Bpmn4FrssWebEditor from "../../src/editor";
import bpmn from "../../misc/diagram2.bpmn?raw";

// import all necessary css
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-color-picker/colors/color-picker.css";
import "../../src/frss-extension/assets/bpmn4frss.css";

export interface Bpmn4FrssEditorProps {
  cssClassNames: {
    containerCssClass: string;
    libraryCssClass: string;
    controls: {
      container: string,
      loadButtonCssClass: string;
    };
  };
}

/**
 * Component encapsulating the bpmn4frss js library
 *
 * @param {Bpmn4FrssEditorProps} props - props for the
 * @returns JSX element
 */
const Bpmn4FrssEditor = ({ cssClassNames }: Bpmn4FrssEditorProps) => {
  // create a reference to mount the library to the rendered element
  const container = useRef();
  // create a reference so mounting and unmounting happens only once
  const initializeLibrary = useRef(true);
  // create a state for the Bpmn4FrssWebEditor
  const [library, setLibrary] = useState<Bpmn4FrssWebEditor>();
  const downloadFile: MutableRefObject<undefined | string> = useRef();

  // mounting the library only once
  useEffect(() => {
    if (initializeLibrary.current) {
      setLibrary(new Bpmn4FrssWebEditor(container.current));
      initializeLibrary.current = false;
    }

    // clean up function (destructor)
    return () => {
      if (!initializeLibrary.current) {
        library?.modeler.destroy();
      }
    };
  }, []);

  const loadDiagramFromFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    if (!file) {
      alert("The file should be specified!");
      return;
    }

    const reader = new FileReader();

    reader.readAsText(file, "utf-8");

    reader.onload = () => {
      const result = reader.result;

      if (typeof result === 'string') {
        library?.loadDiagram(result);
        return;
      }

      alert('file could not be loaded');
    };    
  };

  const loadDefaultDiagram = async () => {
    library?.defaultDiagram();
  }

  const downloadTheFile = async (type: string) => {
    const content = type === "image/svg+xml" 
      ? await library?.saveDiagramSvg() : await library?.saveDiagramAsXML();

    console.log(content);

    const fileName = `diagram.${type === "image/svg+xml" ? "svg" : "bpmn"}`;
    

      if (downloadFile.current) {
        window.URL.revokeObjectURL(downloadFile.current);
      }
  
      const data = new Blob([
        type === 'image/svg+xml'
        ? content.svg : content.xml
      ], {type});
      downloadFile.current = window.URL.createObjectURL(data);
      const tempAnchor = document.createElement("a");
      tempAnchor.href = downloadFile.current;
      tempAnchor.download = fileName;
      document.body.appendChild(tempAnchor);
      tempAnchor.click();
      tempAnchor.remove();
  }

  const downloadDiagramAsXML = async () => {
    await downloadTheFile("text/xml");    
  }

  const downloadDiagramAsSvg = async () => {
    await downloadTheFile("image/svg+xml");
  }

  return (
    <div className={cssClassNames.containerCssClass}>
      {/* Bpmn4Frss typescript library */}
      <div ref={container} className={cssClassNames.libraryCssClass}></div>
      <div className={cssClassNames.controls.container}>
        <div className={cssClassNames.controls.loadButtonCssClass}>
          <label className="clickable" htmlFor="diagram-file-input">Load diagram from file</label>
          <input
            className="clickable input"
            id="diagram-file-input"
            type="file"
            onInput={loadDiagramFromFile}
          />
        </div>

        <div
          className={cssClassNames.controls.loadButtonCssClass}
          onClick={loadDefaultDiagram}
        >
          Load default diagram
        </div>
        <div
          className={cssClassNames.controls.loadButtonCssClass}
          onClick={downloadDiagramAsXML}
        >
          Download diagram (.bpmn)
        </div>
        <div
          className={cssClassNames.controls.loadButtonCssClass}
          onClick={downloadDiagramAsSvg}
        >
          Download diagram (.svg)
        </div>
      </div>
    </div>
  );
};

export default Bpmn4FrssEditor;
