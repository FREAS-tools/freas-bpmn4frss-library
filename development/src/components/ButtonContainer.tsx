import React from "react"

export type ButtonContainerProps = {
  children?: React.ReactNode[],
};

// Container which contains control elements of the bpmn4frss extension
export const ButtonContainer: React.FC<ButtonContainerProps> = ({children}) => (
  <div className="button-container">
    {children}
  </div>
)