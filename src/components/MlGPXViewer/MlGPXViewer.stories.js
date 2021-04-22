import React from "react";

import MlGPXViewer from "./MlGPXViewer";

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
    
    <MlGPXViewer />
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
