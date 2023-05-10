import React, { MutableRefObject } from 'react';
import { SaveSVGResult } from 'bpmn-js/lib/BaseViewer';
import { downloadFile } from "./downloadFile";

/**
 * Download the diagram as an SVG image (.svg)
 *
 * @param downloadFileReference the reference where the file is stored
 * @param content resulting content (XML / SVG) of the diagram
 */
export const downloadDiagramAsSVG = (
  downloadFileReference: MutableRefObject<string | undefined>,
  content: SaveSVGResult | undefined,
) => {
  if (content === undefined || content.svg === undefined) {
    alert("Cannot download file!");
    return;
  }

  downloadFile(downloadFileReference, content.svg, "image/svg+xml");  
}