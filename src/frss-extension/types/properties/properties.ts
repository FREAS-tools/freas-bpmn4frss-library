export interface Props {
  /** The element identifier - used to identify the element by functions */
  identifier: string,
  /** Name of the element - how the element is named */
  name: string,
  /** Element name in lowercase, used for control entries */
  nameLowercase: string,
}

export interface RenderableElementProps extends Props {
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
}

export interface RenderableElementWithIconProps extends RenderableElementProps {
  icon: any,
}

type Properties = Required<Props>
| Required<RenderableElementProps> | Required<RenderableElementWithIconProps>;

export const hasSizeAndOffset = (
  props: Properties,
): props is RenderableElementProps => {
  const convertedProps = props as RenderableElementProps;

  return convertedProps.offset !== undefined
    && convertedProps.size !== undefined;
};

export const hasIcon = (
  props: Properties,
): props is RenderableElementWithIconProps => {
  const convertedProps = props as RenderableElementWithIconProps;
  return hasSizeAndOffset(convertedProps)
    && convertedProps.icon !== undefined;
};

export default Properties;
