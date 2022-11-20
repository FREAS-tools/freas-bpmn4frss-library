import React, { useEffect, useRef, useState } from "react";
import Bpmn4FrssWebEditor from "../../src/editor";
import bpmn from "../../misc/diagram2.bpmn?raw";

// import all necessary css
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "../../src/frss-extension/assets/bpmn4frss.css";

export interface Bpmn4FrssEditorProps {
  cssClassNames: {
    containerCssClass: string;
    libraryCssClass: string;
    controls: {
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

  const onLoad = async () => {
    library?.loadDiagram(bpmn);
  };

  return (
    <div className={cssClassNames.containerCssClass}>
      {/* Bpmn4Frss typescript library */}
      <div ref={container} className={cssClassNames.libraryCssClass}></div>
      <div
        className={cssClassNames.controls.loadButtonCssClass}
        onClick={onLoad}
      >
        Load diagram
      </div>
    </div>
  );
};

export default Bpmn4FrssEditor;
