import { FRSS_PRIORITY } from '../../common';
import { frssPropertiesPanelElements } from '../../elements';

export default class FrssPropertiesPanelProvider {
  static $inject: string[] = [
    'propertiesPanel',
    'translate',
    'elementRegistry',
  ];

  propertiesPanel: any;

  translate: (input: string) => string;

  elementRegistry: any;

  constructor(
    propertiesPanel: any,
    translate: (input: string) => string,
    elementRegistry: any,
  ) {
    this.propertiesPanel = propertiesPanel;
    this.translate = translate;
    this.elementRegistry = elementRegistry;

    propertiesPanel.registerProvider(FRSS_PRIORITY, this);
  }

  getGroups(element: any) {
    const propertyGroupEntries = frssPropertiesPanelElements.flatMap(
      (elem) => (
        elem.controls.propertiesPanelControls.filter(
          (group) => group.show(element),
        )
      ),
    );

    // middleware which intercepts and potentially adds the control entries
    // for the property panel
    return (groups: any[]) => {
      propertyGroupEntries.forEach((groupData) => {
        // push a new group for the provider
        groups.push({
          ...groupData.group,
          entries: groupData.group.entries.filter(
            (entry) => entry.show(
              { element, elementRegistry: this.elementRegistry },
            ),
          ),
          label: this.translate(groupData.group.label),
        });
      });

      return groups;
    };
  }
}
