import React from "react";

import { MapComponentsProvider } from "react-map-components-core";

import TopToolbar from "../../ui_components/TopToolbar";

import { MlOsmLayer } from "../";
import MlDraggableFeatureLayer from "./MlDraggableFeatureLayer";

import "../../App.css";

let MlDraggableFeatureLayerStories = {
  title: "MapComponents/MlDraggableFeatureLayer",
  component: MlDraggableFeatureLayer,
};

export default MlDraggableFeatureLayerStories;

const Template = () => (
  <TopToolbar>
    <MlDraggableFeatureLayer />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
