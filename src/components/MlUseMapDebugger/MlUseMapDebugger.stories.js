import React from "react";

import MlUseMapDebugger from "./MlUseMapDebugger";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import Sidebar from "../../ui_components/Sidebar";

const storyoptions = {
  title: "MapComponents/MlUseMapDebugger",
  component: MlUseMapDebugger,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => {
  return (
    <>
      <MlUseMapDebugger {...props} />
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  mapId: "map_1",
};
