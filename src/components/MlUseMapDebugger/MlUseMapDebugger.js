import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import { Drawer, IconButton } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

import useMapState from "../../hooks/useMapState";
import { render } from "@testing-library/react";

/**
 * Renders a collapsable top-drawer containing live map debug information
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
const MlUseMapDebugger = (props) => {
  const map = useMapState({
    mapId: props.mapId,
    watch: {
      layers: true,
      sources: false, // not yet provided
      viewport: false,
      ...props.watch,
    },
    filter: {
      ...props.filter,
    },
  });
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  const [debuggerOpen, setDebuggerOpen] = useState(true);
  //const [maxHeight /*setMaxHeight*/] = useState("50%");

  return (
    <>
      {/*
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
            maxHeight: "100px",
            position: "relative",
          },
        }}
        hideBackdrop={true}
        variant="persistent"
      ></Drawer>
      */}
      <div style={{ overflow: "hidden", width: "100px", height: "20px" }}>
        Render: {renderCounter.current}
        <br />
        <pre>{JSON.stringify(map, null, " ")}</pre>
      </div>
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
