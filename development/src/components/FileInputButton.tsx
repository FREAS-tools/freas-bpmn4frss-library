import React from "react";
import FrssModeler from "../../../src/editor";

export type FileInputButtonProps = {
  caption: string,
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    library: FrssModeler | undefined
  ) => void,
  library: FrssModeler | undefined;
};

/**
 * Input "button" (form with an input element) which can take files
 * and handles them via the `onChange` prop
 *
 * @param caption, onChange event, FrssModeler
 * @returns 
 */
export const FileInputButton: React.FC<FileInputButtonProps> = ({
  caption,
  onChange,
  library,
}) => (
  <form className="input-container">
    <label className="button clickable" htmlFor="diagram-file-input">
      {caption}
    </label>
    <input
      className="input"
      id="diagram-file-input"
      type="file"
      onChange={(event) => onChange(event, library)}
    />
  </form>
)