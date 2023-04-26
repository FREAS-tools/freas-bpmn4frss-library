import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import FrssModeler from "../../src/editor";

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
 * @returns JSX (TSX) element
 */
const Bpmn4FrssEditor = ({ cssClassNames }: Bpmn4FrssEditorProps) => {
  // create a reference to mount the library to the rendered element
  const container = useRef();
  // create a reference so mounting and unmounting happens only once
  const initializeLibrary = useRef(true);
  // create a state for the Bpmn4FrssWebEditor
  const [library, setLibrary] = useState<FrssModeler>();
  const downloadFile: MutableRefObject<undefined | string> = useRef();

  // mounting the library only once
  useEffect(() => {
    if (initializeLibrary.current) {
      setLibrary(new FrssModeler({ container: container.current }));
      initializeLibrary.current = false;
    }

    // clean up function (destructor)
    return () => {
      if (!initializeLibrary.current) {
        library?.destroy();
      }
    };
  }, []);

  // loading the default diagram on start
  useEffect(() => {
    library?.loadDefaultDiagram();
  }, [library])

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

  const downloadTheFile = (
    content: string,
    type: "image/svg+xml" | "text/xml"
  ) => {
    const fileType = type === "image/svg+xml" ? "svg" : "bpmn";
    const fileName = `diagram.${fileType}`;

      if (downloadFile.current) {
        window.URL.revokeObjectURL(downloadFile.current);
      }
      
      const data = new Blob([content], {type});
      downloadFile.current = window.URL.createObjectURL(data);
      const tempAnchor = document.createElement("a");
      tempAnchor.href = downloadFile.current;
      tempAnchor.download = fileName;
      document.body.appendChild(tempAnchor);
      tempAnchor.click();
      tempAnchor.remove();
  }

  const downloadDiagramAsXML = async () => {
    const content = await library?.saveXML();
    if (content.error !== undefined || content.xml === undefined) {
      alert("Cannot download file!");
      return;
    }

    downloadTheFile(content.xml, "text/xml");    
  }

  const downloadDiagramAsSvg = async () => {
    const content = await library?.saveSVG();

    downloadTheFile(content.svg, "image/svg+xml");   
  }

  const tryMe = () => {
    console.log(library.getDefinitions());
  }

  return (
    <div className={cssClassNames.containerCssClass}>
      {/* Bpmn4Frss typescript library */}
      <div ref={container} className={cssClassNames.libraryCssClass}></div>
      <div className={cssClassNames.controls.container}>
        <div>
          <label className={`clickable ${cssClassNames.controls.loadButtonCssClass}`} htmlFor="diagram-file-input">Load diagram from file</label>
          <input
            className="clickable input"
            id="diagram-file-input"
            type="file"
            onInput={loadDiagramFromFile}
          />
        </div>

        <button
          className={cssClassNames.controls.loadButtonCssClass}
          onClick={() => library?.loadDefaultDiagram()}
        >
          Load default diagram
        </button>
        <button
          className={cssClassNames.controls.loadButtonCssClass}
          onClick={downloadDiagramAsXML}
        >
          Download diagram (.bpmn)
        </button>
        <button
          className={cssClassNames.controls.loadButtonCssClass}
          onClick={downloadDiagramAsSvg}
        >
          Download diagram (.svg)
        </button>
        <button
          className={cssClassNames.controls.loadButtonCssClass}
          onClick={tryMe}
        >
          Try me
        </button>
        <button
          className={cssClassNames.controls.loadButtonCssClass}
          onClick={() => library?.setNormalMode()}
        >
          Set normal mode
        </button>
        <button
          className={cssClassNames.controls.loadButtonCssClass}
          onClick={() => library?.setEvidenceViewMode()}
        >
          Set evidence view mode
        </button>
      </div>
    </div>
  );
};

export default Bpmn4FrssEditor;
