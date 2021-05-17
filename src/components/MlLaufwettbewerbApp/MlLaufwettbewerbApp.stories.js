import React from "react";

import MlLaufwettbewerbApp from "./MlLaufwettbewerbApp";

import emptyMapContextDecorator from "../../decorators/EmptyMapContextDecorator";
import "./style.css";

const storyoptions = {
  title: "MapComponents/MlLaufwettbewerbApp",
  component: MlLaufwettbewerbApp,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: emptyMapContextDecorator,
};
export default storyoptions;

const Template = (args) => (
  <>
    <MlLaufwettbewerbApp />
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
