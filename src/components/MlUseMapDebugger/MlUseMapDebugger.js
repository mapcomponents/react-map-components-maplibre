import React, { useState } from "react";
import PropTypes from "prop-types";

import ReactJson from "react-json-view";
import { Drawer, IconButton } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

import useMap from "../../hooks/useMap";

/**
 * Sets the center of the MapLibre map (props.mapId) to [7.132122000552613, 50.716405378037706]
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
const MlUseMapDebugger = (props) => {
  const map = useMap(props.mapId);
  const [debuggerOpen, setDebuggerOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("50%");

  return (
    <>
      <IconButton
        sx={{ zIndex: 10000 }}
        aria-label="delete"
        size="small"
        onClick={() => setDebuggerOpen(!debuggerOpen)}
      >
        <CodeIcon fontSize="inherit" />
      </IconButton>
      <Drawer
        anchor="top"
        open={debuggerOpen}
        onClose={() => setDebuggerOpen(!debuggerOpen)}
        PaperProps={{
          sx: {
            opacity: 0.85,
            maxHeight: maxHeight,
          },
        }}
        hideBackdrop={true}
        variant="persistent"
      >
        <ReactJson
          groupArraysAfterLength={50}
          src={map}
          style={{ padding: "20px" }}
          theme="monokai"
          collapsed={2}
        />
      </Drawer>
    </>
  );
};

MlUseMapDebugger.defaultProps = {
  mapId: undefined,
};

MlUseMapDebugger.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
};
export default MlUseMapDebugger;
