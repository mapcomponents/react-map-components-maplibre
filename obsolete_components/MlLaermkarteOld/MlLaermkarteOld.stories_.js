import React from "react";

import MlLaermkarte from "./MlLaermkarteOld";

//import mapContext3DDecorator from "../../decorators/MapContext3DDecorator";
import mapContextDecorator from "../../decorators/MapContextKlokantechBasicDecorator";

import "../../App.css";

export default {
  title: "Applications/MlLaermkarteOld",
  component: MlLaermkarte,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};

const Template = (args) => (
  <>
    <MlLaermkarte />
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
