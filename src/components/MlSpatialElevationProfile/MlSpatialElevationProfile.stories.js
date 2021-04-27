import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlSpatialElevationProfile from "./MlSpatialElevationProfile";
import MlGPXViewer from "../MlGPXViewer/MlGPXViewer";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import GeoJsonProvider from "../MlGPXViewer/util/GeoJsonProvider";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlSpatialElevationProfile",
  component: MlSpatialElevationProfile,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
  decorators: mapContextDecorator,
};

const Template = (args) => (
  <>
    <GeoJsonProvider>
      <MlGPXViewer />
      <MlSpatialElevationProfile />
    </GeoJsonProvider>
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
