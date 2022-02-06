import React from "react";

import MlGeoJsonLayer from "./MlGeoJsonLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import sample_geojson_1 from "./assets/sample_1.json";
import sample_polygon_geojson_1 from "./assets/sample_polygon_1.json";

console.log(sample_polygon_geojson_1);
const storyoptions = {
  title: "MapComponents/MlGeoJsonLayer",
  component: MlGeoJsonLayer,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => {
  return (
    <>
      <MlGeoJsonLayer {...props} />
    </>
  );
};
const LinestringTemplate = (props) => {
  return (
    <>
      <MlGeoJsonLayer type="line" geojson={sample_geojson_1} />
    </>
  );
};

export const Linestring = LinestringTemplate.bind({});
Linestring.parameters = {};
Linestring.args = {};

export const Polygon = Template.bind({});
Polygon.parameters = {};
Polygon.args = {
  geojson: sample_polygon_geojson_1,
};
export const DefaultPaintOverrides = Template.bind({});
DefaultPaintOverrides.parameters = {};
DefaultPaintOverrides.args = {
  defaultPaintOverrides: {
    fill: {
      "fill-color": "blue",
    },
    circle: {
      "circle-color": "red",
    },
    line: {
      "line-color": "orange",
    },
  },
  geojson: sample_polygon_geojson_1,
};
