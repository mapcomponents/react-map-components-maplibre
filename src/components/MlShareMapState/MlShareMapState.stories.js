import React, { useState } from "react";

import MlShareMapState from "./MlShareMapState";
import mapContextDecorator from "../../decorators/MapContextDecorator";
import useMapState from "../../hooks/useMapState";
import useMap from "../../hooks/useMap";
import Sidebar from "../../ui_components/Sidebar";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ListItemText from "@mui/material/ListItemText";
import sample_geojson_1 from "../MlGeoJsonLayer/assets/sample_1.json";
import sample_geojson_2 from "../MlGeoJsonLayer/assets/sample_2.json";
import List from "@mui/material/List";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import { ToggleButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const storyoptions = {
  title: "MapComponents/MlShareMapState",
  component: MlShareMapState,
  argTypes: {},
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
  const geoJsonArray = [sample_geojson_1, sample_geojson_2];
  const [watchState, setWatchState] = useState(true);
  const mapHook = useMap({ mapId: "map_1" });
  const mapState = useMapState({
    mapId: "map_1",
    watch: {
      viewport: false,
      layers: true,
      sources: false,
    },
    filter: {
      includeBaseLayers: false,
    },
  });

  return (
    <>
      <MlShareMapState active={watchState} />
      {geoJsonArray.map((el, i) => (
        <MlGeoJsonLayer layerId={"GeoJson_" + i} type="line" geojson={el} key={"GeoJson_" + i} />
      ))}
      <Sidebar sx={{ wordBreak: "break-word" }}>
        <ToggleButton
          size="small"
          selected={watchState}
          value={watchState}
          onChange={() => {
            setWatchState(!watchState);
          }}
        >
          {watchState ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />}

          {watchState ? "active" : "inactive"}
        </ToggleButton>
        <List dense key="layers">
          {mapState.layers?.map((el) => (
            <ListItem
              key={el.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="toggle visibility"
                  onClick={() => {
                    let currentVisibility = mapHook.map
                      ?.getLayer?.(el.id)
                      ?.getLayoutProperty("visibility");
                    mapHook.map
                      ?.getLayer?.(el.id)
                      ?.setLayoutProperty(
                        "visibility",
                        currentVisibility === "none" ? "visible" : "none"
                      );
                    mapHook.map.map.fire("zoom");
                  }}
                >
                  {el.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              }
            >
              <ListItemText primary={el.id} secondary={""} />
            </ListItem>
          ))}
        </List>
      </Sidebar>
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
