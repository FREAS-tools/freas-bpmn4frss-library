# BPMN4FRSS Library

JavaScript library for a web-based modeler of BPMN4FRSS language (an extension of BPMN modelling language, aimed for forensic readiness). Based on [bpmn-js](https://github.com/bpmn-io/bpmn-js). TypeScript wrapper allowing usage with typed projects is available.

## Purpose

The BPMN4FRSS editor allows us to model already existing and new systems and track the pieces of digital evidence in them. This allows for analyses and evaluations of the forensic readiness of the system in question.

## Development note

Until the npm package is released, there will be cross references to other repositories, most notably the `freas-bpmn4frss-components` repository, which will be used for the development and release purposes. These repositories will be updated with each release.

The README and also the wiki explaining the process of development of the bpmn-js extension.

## Usage

Will be updated.

<!-- TODO: Update this section -->

## Repository structure

```txt
│ # React project used for HMR during development
├ development
│
│ # library source folder
├ src/
│  │
│  │ # consists of the editor class, which serves
│  │ # as the object in the Recoil atom
│  │ # for the wrapper component, serves as the interface
│  │ # between the BPMN4FRSS library and React
│  ├ editor/
│  │
│  │ # all error messages that the library throws
│  ├ errors.js
│  │
│  │ # for exporting the library to React
│  └ lib.js
│
│ # typescript declaration files
│ # (allows usage in typed projects)
├ types/
│
│ # settings for ESLint in this library
├ .eslintrc.json
│
│ # TypeScript configuration file for creating
│ # declaration files
└ tsconfig.json
```

## Documentation

Can be found [here]().
