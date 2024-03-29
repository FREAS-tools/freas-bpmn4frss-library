type FrssModdleDefinitionBase = {
  /**
   * Name of the element in moddle
   */
  name: string,
  properties: {
    // Don't care what other metadata the property has
    [x: string | number | symbol]: unknown,
    // every property has a name
    name: string,
    type: string,
  }[],
};

export type FrssModdleSemanticDefinition = (FrssModdleDefinitionBase & ({
  /**
 * This element extends the DEFAULT behaviour of an already existing element.
 * All already existing elements have this extension from now.
 */
  extends: string[],
  superClass?: never,
} | {
  extends?: never,
  /**
   * This element takes the implementation of an already existing
   * element and adds something to it.
   * This element is a whole new entity though.
   */
  superClass: string[],
}));

export type FrssModdleEnumerationDefinition = {
  literalNames:
  {
    name: string,
  }[],
  name: string,
};
