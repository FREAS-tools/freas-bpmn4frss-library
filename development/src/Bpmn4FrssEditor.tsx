import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Bpmn4FrssWebEditor from "../../src/editor";
import bpmn from "../../misc/diagram4.bpmn?raw";

/**
 * Component encapsulating the bpmn4frss js library
 *
 * @param props - properties used by the
 * @returns JSX element
 */
const Bpmn4FrssEditor = () => {
  // create a unique identifier to mount the library to
  const id = `bpmn4frss-${uuidv4()}`;

  // setting a reference so mounting and unmounting happens only once
  const initializeLibrary = useRef(true);
  // setting a reference to use the BPMN4FRSS editor
  const [library, setLibrary] = useState<Bpmn4FrssWebEditor>();

  // mounting the library only once
  useEffect(() => {
    if (initializeLibrary.current) {
      setLibrary(new Bpmn4FrssWebEditor(id));
      initializeLibrary.current = false;
    }
  }, []);

  const onLoad = async () => {
    library?.loadDiagram(bpmn);
  }

  return (
    <div className="bpmn4frss">
      <div id={id} className="bpmn4frss__editor editor"></div>
      <div className="editor__load-diagram" onClick={onLoad}>Load diagram</div>
    </div>
  );
};

export default Bpmn4FrssEditor;
