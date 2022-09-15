/*
 * Library entry-point
 * Allows importing the whole library as "Bpmn4Frss" module
 */
import * as FrssEditor from './editor';
import * as FrssExtension from './frss-extension';
import * as FrssOverlays from './overlays';

// const Bpmn4Frss = { Editor, FrssExtension, Overlays };

// export default Bpmn4Frss;

export { FrssEditor, FrssOverlays };

export default FrssExtension;
