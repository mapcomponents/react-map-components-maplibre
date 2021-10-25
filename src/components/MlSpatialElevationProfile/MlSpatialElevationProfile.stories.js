import React from "react";

import MlSpatialElevationProfile from "./MlSpatialElevationProfile";
import MlGPXViewer from "../MlGPXViewer/MlGPXViewer";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import GeoJsonProvider from "../MlGPXViewer/util/GeoJsonProvider";
import Button from "@mui/material/Button";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";

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
    <IconButton
      style={{
        position: "absolute",
        right: "5px",
        bottom: "125px",
        backgroundColor: "rgba(255,255,255,1)",

        zIndex: 1000,
      }}
      title="Download sample-data"
      size="large"
      href="/assets/sample.gpx"
      target="blank"
    >
      <FileDownloadIcon/>
    </IconButton>
    <GeoJsonProvider>
      <MlGPXViewer/>
      <MlSpatialElevationProfile/>
    </GeoJsonProvider>
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
