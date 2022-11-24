interface Definition {
  /**
   * This element extends the DEFAULT behaviour of an already existing element.
   * All already existing elements have this extension from now.
   */
  extends?: string[],
  /**
   * Name of the element in moddle
   */
  name: string,
  /** Properties of the element (@todo get the actual type here) */
  properties: {
    // Don't care what other metadata the property has
    [x: string | number | symbol]: unknown,
    // every property has a number
    name: string,
  }[],
  /**
   * This element takes the implementation of an already existing
   * element and adds something to it.
   * This element is a whole new entity though.
   */
  superClass?: string[],
}

export default Definition;
