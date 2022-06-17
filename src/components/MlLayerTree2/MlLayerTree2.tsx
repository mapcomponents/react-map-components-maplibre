import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight, ExpandMore, LayersOutlined } from "@mui/icons-material";
import { Box, Button, Drawer, IconButton, useMediaQuery } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import useMap from "../../hooks/useMap";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import { LayerTreeBranch } from "./types/LayerTreeBranch";
import MlWmsLayer from "../MlWmsLayer/MlWmsLayer";
import RecursiveTree from "./components/RecursiveTree";

interface MlLayerTree2Props {
  mapId?: string;
  insertBeforeLayer?: string;
  layerConfig: MlLayerTreeConfig[];
}

interface MlLayerTreeConfig {
  readonly id: string;
  readonly partentId: string;
  readonly label: string;
  readonly visible: boolean;
  layers?: MlLayerTreeConfig[];
  layer?: React.ReactNode | typeof MlGeoJsonLayer | typeof MlWmsLayer;
}

/**
 * Component template
 *
 */
const MlLayerTree2 = (props: MlLayerTree2Props) => {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });
  const initializedRef = useRef(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const mediaIsMobile = useMediaQuery("(max-width:900px)");

  const buttonStyle = {
    minWidth: "20px",
    minHeight: "20px",
    width: mediaIsMobile ? "50px" : "30px",
    height: mediaIsMobile ? "50px" : "30px",
    backgroundColor: "#414141",
    borderRadius: "23%",
    margin: 0.15,
    fontSize: mediaIsMobile ? "1.5em" : "1.2em",
    ":hover": {
      backgroundColor: "#515151",
    },
    color: "#ececec",
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    // the MapLibre-gl instance (mapHook.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;

    mapHook.map.map.setCenter([7.132122000552613, 50.716405378037706]);
  }, [mapHook.map, props.mapId]);

  const onSelect = (value: LayerTreeBranch) => {
    // You can put whatever here
    alert("you clicked: " + value.label);
  };

  return (
    <>
      <div
        style={{
          zIndex: 501,
          position: "absolute",
          left: "5px",
          top: "20px",
        }}
      >
        <Button sx={{ ...buttonStyle, color: "#ececec" }} onClick={toggleDrawer}>
          <LayersOutlined sx={{ fontSize: mediaIsMobile ? "1.5em" : "1.2em" }} />
        </Button>
      </div>
      <div style={{ display: drawerOpen ? "block" : "none" }}>
        <Drawer anchor="left" variant="persistent" open={drawerOpen} onClose={toggleDrawer}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "4px",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </div>
          <RecursiveTree listMeta={props.layerConfig} onSelectCallback={onSelect} />
        </Drawer>
      </div>
    </>
  );
};

MlLayerTree2.defaultProps = {
  mapId: undefined,
};
export default MlLayerTree2;
