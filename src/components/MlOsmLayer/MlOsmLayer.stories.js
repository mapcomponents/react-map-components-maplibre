import React from "react";

import MlOsmLayer from "./MlOsmLayer";
import TopToolbar from "../../ui_components/TopToolbar";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlOsmLayer",
  component: MlOsmLayer,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
  decorators: mapContextDecorator,
};

const Template = () => (
  <TopToolbar>
    <MlOsmLayer />
  </TopToolbar>
);

// <MapLibreMap options={args.options} />
export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {
  //storyshots: { disable: true },
};
//ExampleConfig.args = {
//  //  options: {
//  //    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
//  //    center: [8.607, 53.1409349],
//  //    maxBounds: [
//  //      [1.40625, 43.452919],
//  //      [17.797852, 55.973798],
//  //    ],
//  //  },
//};
