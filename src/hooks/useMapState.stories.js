import React, { useEffect } from "react";

import useMapState from "./useMapState";

import mapContextDecorator from "../decorators/MapContextDecorator";

const storyoptions = {
  title: "Hooks/UseMapState",
  component: useMapState,
  argTypes: {},
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => {
  const mapState = useMapState({ ...props });

  useEffect(() => {

  
  }, [mapState.layers])

  return (
    <>
    <div
        style={{
          position: "fixed",
          zIndex: 10000,
          display: "flex",
          flexWrap: "wrap",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          maxHeight:'100VH',
          backgroundColor: "rgba(80,80,80,.8)",
          padding: "50px",
          fontSize: "20px",
          color: "#51ff09",
          overflow:'hidden',
          pointerEvents: "none",
        }}
    >

        <pre>{JSON.stringify(mapState, null, "  ")}</pre>


    </div>
    </>
  );
};

export const ViewportOnly = Template.bind({});
ViewportOnly.parameters = {};
ViewportOnly.args = {
  mapId: "map_1",
  watch: {
    viewport: true,
    layers: false,
    sources: false,
  },
};

export const IncludeBaseLayers = Template.bind({});
IncludeBaseLayers.parameters = {};
IncludeBaseLayers.args = {
  mapId: "map_1",
  watch: {
    viewport: false,
    layers: true,
    sources: false,
  },
  filter: {
    includeBaseLayers: true,
  },
};

export const MatchLayerIdString = Template.bind({});
MatchLayerIdString.parameters = {};
MatchLayerIdString.args = {
  mapId: "map_1",
  watch: {
    viewport: false,
    layers: true,
    sources: false,
  },
  filter: {
    includeBaseLayers: true,
    matchLayerIds: "water",
  },
};

export const MatchLayerIdRegexp = Template.bind({});
MatchLayerIdRegexp.parameters = {};
MatchLayerIdRegexp.args = {
  mapId: "map_1",
  watch: {
    viewport: false,
    layers: true,
    sources: false,
  },
  filter: {
    includeBaseLayers: true,
    matchLayerIds: /water/,
  },
};

export const NonBaseLayersOnly = Template.bind({});
NonBaseLayersOnly.parameters = {};
NonBaseLayersOnly.args = {
  mapId: "map_1",
  watch: {
    viewport: false,
    layers: true,
    sources: false,
  },
  filter: {
    includeBaseLayers: false,
  },
};
