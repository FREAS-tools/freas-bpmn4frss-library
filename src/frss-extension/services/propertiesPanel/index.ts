import { FRSS_PRIORITY } from '../../common';
import { frssPropertiesPanelElements } from '../../elements';

export default class FrssPropertiesPanelProvider {
  static $inject: string[] = ['propertiesPanel', 'translate'];

  propertiesPanel: any;

  translate: (input: string) => string;

  constructor(propertiesPanel: any, translate: (input: string) => string) {
    this.propertiesPanel = propertiesPanel;
    this.translate = translate;

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
            (entry) => entry.show(element),
          ),
          label: this.translate(groupData.group.label),
        });
      });

      return groups;
    };
  }
}
