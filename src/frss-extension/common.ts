/**
 * This module contains common constants, shared between files
 */

export const bpmn4frss = 'bpmn4frss';

export const bpmn4frssPrefix = `${bpmn4frss}:`;

/**
 * Set custom priority for FRSS extension.
 * This priority is by default set to 1400 to not interfere
 * with other custom priorities. In case you want to use other extensions,
 * set your PRIORITY value to a different value.
 */
export const FRSS_PRIORITY = 1400;

/**
 * The fallback size for an element is 32px x 32px if the element does not have
 * a size defined in its `properties` module
 */
export const ELEMENT_FALLBACK_SIZE = 32;

/**
 * The fallback offset for an element is 0 if the element does not have
 * an offset defined in its `properties` module
 */
export const ELEMENT_FALLBACK_OFFSET = 0;
