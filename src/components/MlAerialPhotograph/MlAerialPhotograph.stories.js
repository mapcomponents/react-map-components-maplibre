import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MlAerialPhotograph from "./MlAerialPhotograph";
import Legend from "../../ui_components/Legend";
import MapContextDecorator from "../../decorators/MapContextDecorator";


export default {
  title: "MapComponents/MlAerialPhotograph",
  component: MlAerialPhotograph,
    argTypes: {
        url: {},
        layer: {},
    },

    decorator: MapContextDecorator
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