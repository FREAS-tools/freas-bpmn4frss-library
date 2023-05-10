import React, {MutableRefObject} from 'react';

/**
 * Download the file (temporarily creates an 
 * anchor element and allows element download)
 *
 * @param downloadFileReference the reference where the file is stored
 * @param content resulting content (XML / SVG) of the diagram
 * @param fileType type of file to download
 */
export const downloadFile = (
  downloadFileReference: MutableRefObject<string | undefined>,
  content: string,
  fileType: "image/svg+xml" | "text/xml"
) => {
  // determine the file extension
  const fileExtension = fileType === "image/svg+xml" ? "svg" : "bpmn";
  const fileName = `diagram.${fileExtension}`;

  // revoke the exsiting object (previous diagram)
  if (downloadFileReference.current) {
    window.URL.revokeObjectURL(downloadFileReference.current);
  }
  
  // create a new BLOB
  const data = new Blob([content], {type: fileType});
  
  // create a URL for the object
  downloadFileReference.current = window.URL.createObjectURL(data);

  // temporarily create an invisible anchor element which
  // is unmounted right after the download is initiated
  const tempAnchor = document.createElement("a");
  tempAnchor.href = downloadFileReference.current;
  tempAnchor.download = fileName;
  document.body.appendChild(tempAnchor);
  
  // start download
  tempAnchor.click();
  tempAnchor.remove();
}