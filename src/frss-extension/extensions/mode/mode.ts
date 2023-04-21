export enum RenderingMode {
  EvidenceMode = 'evidence-mode',
  Normal = 'normal',
}

let renderingMode: RenderingMode = RenderingMode.EvidenceMode;

export const getRenderingMode = () => renderingMode;
export const setRenderingMode = (newMode: RenderingMode): void => {
  renderingMode = newMode;
};

export const setNormalRenderingMode = () => {
  renderingMode = RenderingMode.Normal;
};

export const setEvidenceRenderingMode = () => {
  renderingMode = RenderingMode.EvidenceMode;
};
