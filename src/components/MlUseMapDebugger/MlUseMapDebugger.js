import React, { useState } from "react";
import PropTypes from "prop-types";

import { Drawer, IconButton } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

import useMapState from "../../hooks/useMapState";

/**
 * Sets the center of the MapLibre map (props.mapId) to [7.132122000552613, 50.716405378037706]
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
const MlUseMapDebugger = (props) => {
  const map = useMapState(props.mapId);
  const [debuggerOpen, setDebuggerOpen] = useState(false);
  //const [maxHeight /*setMaxHeight*/] = useState("50%");

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
            maxHeight: "50%",
          },
        }}
        hideBackdrop={true}
        variant="persistent"
      >
        <pre>{JSON.stringify(map, null, " ")}</pre>
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
