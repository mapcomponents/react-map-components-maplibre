import React from "react";

import MlLaermkarte from "./MlLaermkarte";

//import mapContext3DDecorator from "../../decorators/MapContext3DDecorator";
import mapContextDecorator from "../../decorators/MapContextKlokantechBasicDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Applications/MlLaermkarte",
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
