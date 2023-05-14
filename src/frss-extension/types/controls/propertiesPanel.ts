import type { VNode } from 'preact';

export type PropertiesPanelData = {
  group: PropertiesPanelGroup,
  show: (element: any) => boolean
};

export type PropertiesPanelEntryShowContext = {
  element: any,
  elementRegistry: any,
};

export type PropertiesPanelEntry = {
  component: (props: any) => VNode,
  id: string,
  isEdited?: any,
  show: (context: PropertiesPanelEntryShowContext) => boolean
};

export type PropertiesPanelGroup = {
  entries: PropertiesPanelEntry[],
  id: string,
  label: string
};
