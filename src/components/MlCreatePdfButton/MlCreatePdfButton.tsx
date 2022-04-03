import React from "react";
import useMap from "../../hooks/useMap";

import createPdf from "./lib/createPdf";

import PrinterIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";

interface MlCreatePdfButtonProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId?: string;
  /**
   * Id of an existing layer in the mapLibre instance to help specify the layer order
   * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
   */
  insertBeforeLayer?: string;
}

/**
 * Renders a button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 */
const MlCreatePdfButton = (props: MlCreatePdfButtonProps) => {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          if (mapHook.map) {
            createPdf(mapHook.map, null, () => {});
          }
        }}
      >
        <PrinterIcon />
      </Button>
    </>
  );
};

MlCreatePdfButton.defaultProps = {
  mapId: undefined,
};

export default MlCreatePdfButton;
