/**
 * Properties that every FRSS element has
 */
export type ElementBaseProperties = {
  /** The element identifier - used to identify the element by functions */
  identifier: string,
  /** Name of the element - how the element is named */
  name: string,
  /** Element name in lowercase, used for control entries */
  nameLowercase: string,
};

/**
 * Properties of a CUSTOM renderable FRSS element (i.e. one which is not
 * just a modification of an already existing element, but a completely
 * new one)
 */
export type CustomRenderableElementProperties = ElementBaseProperties & {
  /** The element offset - the displayed element can have an offset */
  offset: {
    x: number,
    y: number,
  },
  /** the height and width of the element */
  size: {
    height: number,
    width: number,
  },
};

/**
 * Properties of a CUSTOM renderable FRSS element which also has its own icon.
 */
export type CustomRenderableElementWithIconProperties = (
  CustomRenderableElementProperties & {
    icon: any,
  }
);

/**
 * Properties of an element can be either base, renderable,
 * or renderable with icons.
 */
export type FrssProperties = ElementBaseProperties
| CustomRenderableElementProperties
| CustomRenderableElementWithIconProperties;

/**
 * Type guard for filtering the elements which have a size and offset.
 *
 * @param props any properties element
 * @returns true if the element properties have size and offset (
 * the type is `CustomRenderableElementProperties`)
 */
export const hasSizeAndOffset = (
  props: FrssProperties,
): props is CustomRenderableElementProperties => {
  const convertedProps = props as CustomRenderableElementProperties;

  return convertedProps.offset !== undefined
    && convertedProps.size !== undefined;
};

/**
 * Type guard for filtering the elements which have a size and offset and also
 * have a custom icon.
 *
 * @param props any properties element
 * @returns true if the element properties have size, offset, and an icon (
 * the type is `CustomRenderableElementWithIconProperties`)
 */
export const hasIcon = (
  props: FrssProperties,
): props is CustomRenderableElementWithIconProperties => {
  const convertedProps = props as CustomRenderableElementWithIconProperties;
  return hasSizeAndOffset(convertedProps)
    && convertedProps.icon !== undefined;
};
