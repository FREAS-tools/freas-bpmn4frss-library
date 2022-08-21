# Elements module

<!-- WARNING the docs will change during the development -->

Elements module is the de-facto BPMN language extension for Forensic-Ready system evaluation. This module alone can be used with other BPMN extensions, such as [Security Risk-Oriented BPMN](https://www.researchgate.net/publication/319156591_Security_Risk-Oriented_BPMN). Extensions points are:

- Custom elements, along with custom modelling behaviours, custom rendering capabilities and custom rules (f.e. how elements can be laced)
- Pad entries
- Pallete entries

## Folder structure for the maintainers

```txt
# various folders where the language elements (/constructs) live

createBehaviors.js          # how elements are created
definitions.js              # moddle portion - how elements are stored in BPMN compliant way
elementBehaviors.js         # custom rules which define the modelling feel of the extension
index.js                    # module entry point
padEntries.js               # adds pad support for the bpmn4frss extension
paletteEntries.js           # adds palette support for the bpmn4frss extension
```

The files that are outside of the folders are used for connecting all of the elements into a module.

## Information for developers outside that want to extend their editors with BPMN4FRSS extension

<!-- @TODO here goes content = what and where to import if they want to use it -->

## Future reference
