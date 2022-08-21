/*
 * Library entry-point
 * Allows importing the whole library as "Bpmn4Frss" module
 */
import * as Editor from './editor';
import * as Elements from './elements';
import * as Overlays from './overlays';

const Bpmn4Frss = { Editor, Elements, Overlays };

export default Bpmn4Frss;
