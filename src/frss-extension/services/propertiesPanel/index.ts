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
    const showProperties = frssPropertiesPanelElements.find(
      (findElement) => (
        findElement.controls.propertiesPanelControls.show(element)
      ),
    );

    // middleware which intercepts and potentially adds the control entries
    // for the property panel
    return (groups: any[]) => {
      if (showProperties !== undefined) {
        const { propertiesPanelControls } = showProperties.controls;
        // push a new group for the provider
        groups.push({
          ...propertiesPanelControls.group,
          label: this.translate(propertiesPanelControls.group.label),
        });
      }

      return groups;
    };
  }
}
