import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { MapContext } from "@mapcomponents/react-core";

import createPdf from "./lib/createPdf.js";

import PrinterIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";

/**
 * Renders a button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 *
 * @component
 */
const MlCreatePdfButton = (props) => {
  const mapContext = useContext(MapContext);
  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
  }, [mapContext.mapIds, mapContext, props.mapId]);

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          createPdf(mapRef.current, null, () => {});
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

MlCreatePdfButton.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
};

export default MlCreatePdfButton;
