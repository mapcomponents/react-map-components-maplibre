import React from "react";

import MlMarker, { MlMarkerProps } from "./MlMarker";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
    title: "MapComponents/MlMarker",
    component: MlMarker,
    decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args: MlMarkerProps) => <MlMarker {...args} />;

export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
    content: '<b>WhereGroup</b>',
    lng: 7.0851268,
    lat: 50.73884,
    mapId: 'map_1',
};

export const CustomStyledMarker = Template.bind({});
CustomStyledMarker.args = {
  lng: -122.4,
  lat: 37.8,
  anchor: "top-right",
  markerStyle: { 
    width: "20px", 
    height: "20px", 
    backgroundColor: "red",
    border: "2px solid white",
    boxShadow: "0 0 5px rgba(0,0,0,0.5)"
  },
  containerStyle: { 
    backgroundColor: "rgba(255,12,255,0.9)",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)" 
  },
  iframeStyle: { 
    borderRadius: "5px",
    padding: "10px" 
  },
  content: "<h1>Hello World!</h1>",
};
