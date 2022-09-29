import React from "react";
import './App.css';
import Bpmn4FrssEditor, {Bpmn4FrssEditorProps} from "./Bpmn4FrssEditor";

const classes: Bpmn4FrssEditorProps = {
  cssClassNames: {
    containerCssClass: "bpmn4frss",
    libraryCssClass: "editor",
    controls: {
      loadButtonCssClass: "editor__load-diagram"
    }
  }
};

const App = () => {
  return (
    <div className="App">
      <Bpmn4FrssEditor {...classes} />
    </div>
  )
}

export default App
