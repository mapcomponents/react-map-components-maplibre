import React from "react";

import MlFeatureEditor from "./MlFeatureEditor";

import TopToolbar from "../../ui_components/TopToolbar";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlFeatureEditor",
  component: MlFeatureEditor,
  argTypes: {},
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
  return (
    <MlFeatureEditor
      debug={true}
      onChange={(features) => {
        console.log(features);
      }}
      {...args}
    />
  );
};

export const EditPolygon = Template.bind({});
EditPolygon.args = {
  mode: "custom_select",
  geojson: {
    type: "Feature",
    properties: {},
    geometry: {
      coordinates: [
        [
          [7.0904979943736635, 50.73948334574527],
          [7.087554458473562, 50.73827346433987],
          [7.093562913197076, 50.73723639825727],
          [7.096294028980594, 50.7387727842636],
          [7.0904979943736635, 50.73948334574527],
        ],
      ],
      type: "Polygon",
    },
  },
};

export const EditPoint = Template.bind({});
EditPoint.args = {
  mode: "custom_select",
  geojson: {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [7.0904979943736635, 50.73948334574527],
    },
  },
};

export const EditLineString = Template.bind({});
EditLineString.args = {
  mode: "simple_select",
  geojson: {
    type: "Feature",
    properties: {},
    geometry: {
      coordinates: [
        [7.0904979943736635, 50.73948334574527],
        [7.087554458473562, 50.73827346433987],
        [7.093562913197076, 50.73723639825727],
        [7.096294028980594, 50.7387727842636],
      ],
      type: "LineString",
    },
  },
};

export const DrawPolygon = Template.bind({});
DrawPolygon.args = {
  mode: "custom_polygon",
};

export const DrawPoint = Template.bind({});
DrawPoint.args = {
  mode: "draw_point",
};

export const DrawLineString = Template.bind({});
DrawLineString.args = {
  mode: "draw_line_string",
};
