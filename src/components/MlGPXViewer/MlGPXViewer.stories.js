import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlDropzoneImporter from "./MlDropzoneImporter";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlGPXViewer",
  component: MlGPXViewer,
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
    
    <MlDropzoneImporter />
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
