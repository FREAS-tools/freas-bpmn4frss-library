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

export const isRenderable = (
  element: Properties,
): element is RenderableElementProps => {
  const renderable = element as RenderableElementProps;
  return renderable.offset !== undefined && renderable.size !== undefined;
};

export const hasIcon = (
  element: Properties,
): element is RenderableElementWithIconProps => {
  const icon = element as RenderableElementWithIconProps;
  return icon.icon !== undefined;
};

export default Properties;
