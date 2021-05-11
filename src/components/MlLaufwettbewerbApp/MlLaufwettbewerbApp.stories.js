import React from "react";

import MlLaufwettbewerbApp from "./MlLaufwettbewerbApp";

import emptyMapContextDecorator from "../../decorators/EmptyMapContextDecorator";
import "./style.css";

export default {
  title: "MapComponents/MlLaufwettbewerbApp",
  component: MlLaufwettbewerbApp,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: emptyMapContextDecorator,
};

const Template = (args) => (
  <>
    <MlLaufwettbewerbApp />
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
