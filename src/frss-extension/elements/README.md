# Creating a custom element

Creating custom elements for `bpmn-js` consists of several steps. If you wish to extend this language, you have to follow these steps:

- Create a moddle definition
- Create custom rules for the element
- Create an entry for the renderer to display the element in browser
- Create a pallete entry
- Create a pad entry for the element

---

## Files to create for custom elements (/language constructs)

```txt
elements
  LanguageConstructName        # in PascalCase
    behavior.js                # defines how the element / construct behaves within the modeler
    controls.js                # defines controls entries for the modeler (context pad, palette...)
    definition.js              # defines the data representation of the custom element
    redererEntry.js            # defines how the element is rendered
```

---

## Create a moddle definition

Moddle definition allows you to read/write the resulting XML for the moddle portion of the library. Moddle portion reads a `json` definition and acts accordingly. The `bpmn-js` has its [own definition here](https://github.com/bpmn-io/bpmn-moddle/blob/master/resources/bpmn/json/bpmn.json). More on moddle and [how it works here](https://github.com/bpmn-io/moddle/blob/master/docs/descriptor.md). When extending the [BPMN language](https://www.bpmn.org/), it is best to inherit as much functionality as possible from the default elements of the language. That way, you keep the codebase's size minimalistic while only extending what is needed for the language extension. Look at [how the language works here](https://www.omg.org/spec/BPMN/2.0/) (current spec: BPMNv2.0).

---

### Create custom rules for the element

### Create renderer entry

### Create a pallete entry

### Create a pad entry
