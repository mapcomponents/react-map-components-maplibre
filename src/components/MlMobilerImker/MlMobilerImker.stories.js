import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MlMobilerImker from "./MlMobilerImker";
import Legend from "../../ui_components/Legend";
import { MapComponentsProvider } from "react-map-components-core";

export default {
  title: "MapComponents/MlMobilerImker",
  component: MlMobilerImker,
  argTypes: {}
};

const Template = (args) => {
  return (
    <>
      <Legend>
        <MlMobilerImker />
      </Legend>
    </>
  );
};

export const ExampleConfig = Template.bind({});
