import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MlArielPhotograph from "./MlArielPhotograph";
import Legend from "../../ui_components/Legend";
import { MapComponentsProvider } from "react-map-components-core";

export default {
  title: "MapComponents/MlArielPhotograph",
  component: MlArielPhotograph,
  argTypes: {}
};

const Template = (args) => {
  return (
    <>
      <Legend>
        <MlArielPhotograph />
      </Legend>
    </>
  );
};

export const ExampleConfig = Template.bind({});
