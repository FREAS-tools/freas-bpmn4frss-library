interface PreCreateElementRule {
  shouldTrigger: (element: any) => boolean,
  trigger: (element: any) => void,
}

export default PreCreateElementRule;
