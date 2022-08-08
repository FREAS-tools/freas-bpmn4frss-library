# Library package

Library package contains all the extensions that create the BPMN4FRSS web editor.

---

## Installation

Use `npm i` or `npm install` to install all the runtime and development dependencies for the project. These will be installed in `node_modules/`, which is by default ignored by the `.gitignore` file.

---

## Recommended development workflow

We advise using VSCode or WebStorm. While working on the library, there is a script `npm run watch`, which allows building the type definitions for the project while working on it. The library / package can then be used in typed projects, without the need of importing the files as JS (which while strict, provides some additional benefits). Whenever you work with the library, you should have the watcher running, as the type definitions for the library change during your development.
