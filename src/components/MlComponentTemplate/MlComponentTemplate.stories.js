import React from "react";

import MlComponentTemplate from "./MlComponentTemplate";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const storyoptions = {
  title: "MapComponents/MlComponentTemplate",
  component: MlComponentTemplate,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlComponentTemplate />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
