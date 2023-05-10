import React from "react";

export type ButtonProps = {
  caption: string;
  onClick: Function;
}

// A button for manipulating the library
export const Button: React.FC<ButtonProps> = ({caption, onClick}) => (
  <button className="button clickable" onClick={() => onClick()}>
    {caption}
  </button>
);