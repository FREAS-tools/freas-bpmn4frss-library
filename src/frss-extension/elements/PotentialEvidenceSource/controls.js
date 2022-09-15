// // icon for potential evidence sources
// import PotentialEvidenceSourceIcon
//   from './assets/potential-evidence-source.png';

// // Identifier of the potential evidence source element
// import { potentialEvidenceSourceIdentifier } from './rendererEntry';

// // meta-functions for creating elements and palette entries
// import { createElementForPalette, createPaletteEntry } from '../../common';

// // function which is able to create the element, triggered after
// // some action
// export const createElement = (
//   create,
//   elementFactory,
// ) => ((event) => {
//   createElementForPalette(
//     event,
//     {
//       type: potentialEvidenceSourceIdentifier,
//       width: 28,
//       height: 28,
//       businessObject: PotentialEvidenceSourceIcon,
//     },
//     create,
//     elementFactory,
//   );
// });

// export const paletteEntry = (action, translate) => (
//   createPaletteEntry(
//     'create.potential-evidence-source',
//     'activity',
//     'frss-potential-evidence-source',
//     'Create Potential Evidence Source',
//     translate,
//     action,
//   )
// );

// const PotentialEvidenceSourceControls = {
//   create: createElement,
//   palette: paletteEntry,
// };

// export default PotentialEvidenceSourceControls;
