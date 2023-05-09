import React, { useEffect, useRef, useState } from "react";
import FrssModeler from "../../src/editor";

// import all necessary bpmn-js & extensions CSS
import "diagram-js/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-color-picker/colors/color-picker.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css"
import "bpmn-js-properties-panel/dist/assets/element-templates.css"

// import the freas-bpmn4frss-library CSS
import "../../src/frss-extension/elements/assets/bpmn4frss.css";

/**
 * Component encapsulating the bpmn4frss js library
 *
 * @param {Bpmn4FrssEditorProps} props - props for the
 * @returns JSX (TSX) element
 */
const Bpmn4FrssEditor = () => {
  // create a reference to mount the library to the rendered element
  const container = useRef<HTMLDivElement>(null);

  // create a reference to mount the properties panel
  const propertiesContainer = useRef<HTMLDivElement>(null);

  // create a reference so mounting and unmounting happens only once
  const initializeLibrary = useRef(true);

  // create a state for the Bpmn4FrssWebEditor
  const [library, setLibrary] = useState<FrssModeler>();
  const downloadFile = useRef<string | undefined>();


  // allow running resize
  const resizer = () => {
    library?.resize();
  }

  // mounting the library only once
  useEffect(() => {
    if (initializeLibrary.current) {
      setLibrary(
        new FrssModeler({
          container: container.current ?? undefined,
          propertiesPanel: {
            parent: propertiesContainer.current ?? undefined
          }
        })
      );
      initializeLibrary.current = false;
    }

    // clean up function (destructor)
    return () => {
      if (!initializeLibrary.current) {
        window.removeEventListener('resize', resizer);
        library?.destroy();
      }
    };
  }, []);

  // loading the default diagram on start
  useEffect(() => {
    library?.loadDefaultDiagram();

    // add an event listener
    window.addEventListener('resize', resizer);
  }, [library])

  const loadDiagramFromFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileArray = event?.target?.files;

    if (
      fileArray === null
      || fileArray === undefined
      || fileArray[0] === null
    ) {
      alert("The file should be specified!");
      return;
    }
    const file = fileArray[0];

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

    if (content === undefined || content.xml === undefined) {
      alert("Cannot download file!");
      return;
    }

    if (content.error !== undefined) {
      alert("There has been an error downloading the file");
      return;
    }

    downloadTheFile(content.xml, "text/xml");    
  }

  const downloadDiagramAsSvg = async () => {
    const content = await library?.saveSVG();

    if (content === undefined || content.svg === undefined) {
      alert("Cannot download file!");
      return;
    }

    downloadTheFile(content.svg, "image/svg+xml");   
  }

  const tryMe = () => {
    // @ts-ignore
    // console.log(library.getDefinitions());
    // console.log(library.get('canvas').getRootElements());
  }

  return (
    <div className="bpmn4frss">
      {/* Bpmn4Frss typescript library */}
      <div className="editor-container">
        <div ref={container} className="editor"></div>
        <div className="button-container">
          <div className="input-container">
            <label className="button clickable" htmlFor="diagram-file-input">
              Load diagram from file
            </label>
            <input
              className="input"
              id="diagram-file-input"
              type="file"
              onInput={loadDiagramFromFile}
            />
          </div>

          <button
            className="button clickable"
            onClick={() => library?.loadDefaultDiagram()}
          >
            Load default diagram
          </button>
          <button
            className="button clickable"
            onClick={downloadDiagramAsXML}
          >
            Download diagram (.bpmn)
          </button>
          <button
            className="button clickable"
            onClick={downloadDiagramAsSvg}
          >
            Download diagram (.svg)
          </button>
          <button
            className="button clickable"
            onClick={tryMe}
          >
            Try me
          </button>
        </div>
      </div>
      <div ref={propertiesContainer} className="properties"></div>
    </div>
  );
};

export default Bpmn4FrssEditor;
