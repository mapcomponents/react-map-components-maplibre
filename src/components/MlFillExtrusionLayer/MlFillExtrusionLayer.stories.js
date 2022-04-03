import React, {useState} from "react";

import MlFillExtrusionLayer from "./MlFillExtrusionLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlFillExtrusionLayer",
  component: MlFillExtrusionLayer,
  argTypes: {
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => {
  
  return (
    <MlFillExtrusionLayer {...props} />
);
  }

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
