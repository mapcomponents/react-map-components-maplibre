import React, { useContext } from "react";
import { MapContext } from "react-map-components-core";

import createPdf from "./lib/createPdf.js";

import PrinterIcon from "@material-ui/icons/Print";
import Button from "@material-ui/core/Button";

/**
 * MlCreatePdfButton returns a Button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 * It expects a MapLibre-gl instance accessible in mapContext.map.
 */
const MlCreatePdfButton = () => {
  const mapContext = useContext(MapContext);

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          createPdf(mapContext.map, null, () => {});
        }}
      >
        <PrinterIcon />
      </Button>
    </>
  );
};

export default MlCreatePdfButton;
