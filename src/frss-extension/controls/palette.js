// import PotentialEvidenceSource from '../elements/PotentialEvidenceSource';

// icon for potential evidence sources
import PotentialEvidenceSourceIcon
  from
  '../elements/PotentialEvidenceSource/assets/potential-evidence-source.png';
/**
 * FRSS extension of the `bpmn-js` palette
 */
export default class FrssPalette {
  // /**
  //  * This class is used by the `bpmn-js` internals,
  //  * extending the abilities of the original palette.
  //  * All of the parameters are specified by the `bpmn-js`
  //  * and allow us to hook into the default palette.
  //  */
  // constructor(create, elementFactory, palette, translate) {
  //   // save the parameters into the object
  //   this.create = create;
  //   this.elementFactory = elementFactory;
  //   this.translate = translate;

  //   // register this class to the palette provider -> extending the default
  //   // behaviour of the palette
  //   palette.registerProvider(this);
  // }

  // // eslint-disable-next-line no-unused-vars
  // getPaletteEntries(element) {
  //   // obtain the attributes without always using `this.` keyword
  //   const {
  //     create,
  //     elementFactory,
  //     translate,
  //   } = this;

  //   /**
  //    * Palette object contains palette entries, which look like the following:
  //    *
  //    * ```javascript
  //    * {
  //    *   'create.name-of-the-construct': {
  //    *     group: 'some-group-where-constructs-are-grouped-together',
  //    *     className: 'name-of-the-applied-css-class',
  //    *     title: translate('Title which is displayed after hovering over the entry in the palette'),
  //    *     action: {
  //    *       dragstart: functionThatIsTriggeredAfterDraggingTheElement,
  //    *       click: functionThatIsTriggeredAfterClickingTheElement
  //    *     }
  //    *   }
  //    * }
  //    * ```
  //    *
  //    * We have simplified the creation by creating an abstraction -> each
  //    * element shall contain a `Controls` object
  //    */
  //   const palette = {
  //     ...PotentialEvidenceSource.controls.palette(
  //       PotentialEvidenceSource.controls.create(create, elementFactory),
  //       translate,
  //     ),
  //   };

  //   return palette;
  // }

  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  // eslint-disable-next-line no-unused-vars
  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate,
    } = this;

    function createPotentialEvidenceSource() {
      return (event) => {
        const potentialEvidenceSource = bpmnFactory.create(
          'bpmn4frss:PotentialEvidenceSource',
        );
        const shape = elementFactory.createShape({
          type: 'bpmn4frss:PotentialEvidenceSource',
          width: 28,
          height: 28,
          businessObject: potentialEvidenceSource,
        });
        create.start(event, shape);
      };
    }
    return {
      'create.potential-evidence-source': {
        group: 'activity',
        imageUrl: PotentialEvidenceSourceIcon,
        title: translate('Create Potential Evidence Source'),
        action: {
          dragstart: createPotentialEvidenceSource(),
          click: createPotentialEvidenceSource(),
        },
      },
    };
  }
}

// Save the names before the minification
FrssPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate',
];
