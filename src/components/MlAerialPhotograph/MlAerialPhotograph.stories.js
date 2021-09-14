import React from "react";

import "../../App.css";
import MlAerialPhotograph from "./MlAerialPhotograph";
import Legend from "../../ui_components/Legend";
import MapContextDecorator from "../../decorators/MapContextDecorator";

export default {
  title: "Applications/MlAerialPhotograph",
  component: MlAerialPhotograph,
  argTypes: {
    url: {},
    layer: {},
  },

  decorators: MapContextDecorator,
};

const Template = (args) => {
  return (
    <>
      <Legend>
        <MlAerialPhotograph />
      </Legend>
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
