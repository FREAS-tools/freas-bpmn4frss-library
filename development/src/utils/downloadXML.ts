import React, { MutableRefObject } from "react";
import { SaveXMLResult } from 'bpmn-js/lib/BaseViewer';
import { downloadFile } from "./downloadFile";

/**
 * Download the diagram as an XML file (.bpmn)
 *
 * @param downloadFileReference the reference where the file is stored
 * @param content resulting content (XML / SVG) of the diagram
 */
export const donwloadDiagramAsXML = (
  downloadFileReference: MutableRefObject<string | undefined>,
  content: SaveXMLResult | undefined
) => {
  if (content === undefined || content.xml === undefined) {
    alert("Cannot download file!");
    return;
  }

  if (content.error !== undefined) {
    alert("There has been an error downloading the file");
    return;
  }

  downloadFile(downloadFileReference, content.xml, "text/xml");
}