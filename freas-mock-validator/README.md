# `freas-mock-validator`

Mocks the REST API service to allow running a "validation". It works only when the provided diagram (located in the root of this folder - `example-basic-bpmn-diagram.bpmn`) is loaded in the FRSS React integration via the "Load diagram" button.

## Prerequisites

- Node 18 LTS with `npm` (tested with Node version 18.16.0 and `npm` version 9.6.6)
- Free port 4000 (can be changed by modifying the code)

## How to run the validator

First, install the dependencies in this project (folder: `freas-mock-validator`)

```sh
npm i
```

Then run the start script:

```sh
npm start
```

To kill the server, simply use `ctrl+c` combination.

