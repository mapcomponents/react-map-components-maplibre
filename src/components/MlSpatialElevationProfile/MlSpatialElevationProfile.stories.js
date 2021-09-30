import React from "react";

import MlSpatialElevationProfile from "./MlSpatialElevationProfile";
import MlGPXViewer from "../MlGPXViewer/MlGPXViewer";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import GeoJsonProvider from "../MlGPXViewer/util/GeoJsonProvider";

const storyoptions = {
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
export default storyoptions;

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
