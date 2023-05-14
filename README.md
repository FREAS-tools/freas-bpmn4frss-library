# FREAS BPMN4FRSS library

TypeScript-based library that builds upon `bpmn-js` and extends its capabilities. Provides a software engineering solution for designing Forensic-Ready software systems (FRSS).

Most of the features have been implemented and tested.

## Prerequisites

Node 18 LTS with `npm` (tested with Node version 18.16.0 and `npm` version 9.6.6)

## Running locally with the React integration

To run in conjuction with the React integration, install the dependencies for this project (`freas-bpmn4frss-library`):

```sh
cd path_to_the_library/freas-bpmn4frss-library/src
npm i
```

After installing the dependencies, run the:
```sh
ls # should give us freas-bpmn4frss-library/src !!! important
npm link
```

in **this** project (the `freas-bpmn4frss-react` dependencies need to be installed first).

After that, run the:

```sh
cd path_to_the_other_library/freas-bpmn4frss-react
npm i
ls # should give us freas-bpmn4frss-react !!! important
npm link freas-bpmn4frss-library
```

in the `freas-bpmn4frss-react` library to link them together locally.

This allows referencing the library within the React integration. In the future, these projects will be published as `npm` packages. For more information, head over to the [this article](https://sparkbox.com/foundry/test_project_changes_in_real_time_by_linking_your_component_library_and_project_with_npm_link) for more information.

> Note: currently not transpiled to regular JavaScript, so it only works with projects that use TypeScript and are able to transpile it themselves.

## Run validation

To run the mocked validation, follow the instructions in the `freas-mock-validator` folder in this repository. This mocks a REST API, which would respond with validation data. A special diagram needs to be loaded in the app in order to replicate this.

