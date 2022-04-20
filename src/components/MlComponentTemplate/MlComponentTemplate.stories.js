import React from "react";

import MlComponentTemplate from "./MlComponentTemplate";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlComponentTemplate",
  component: MlComponentTemplate,
  argTypes: {
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlComponentTemplate />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
