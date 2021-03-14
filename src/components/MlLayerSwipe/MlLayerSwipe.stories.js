//import React from "react";
//
//import MlLayerSwipe from "./MlLayerSwipe";
//import TopToolbar from "../../ui_components/TopToolbar";
//
//import { MapComponentsProvider } from "react-map-components-core";
//
//import MapLibreMap from "../MapLibreMap/MapLibreMap";
//
//import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";
//
//import "../../App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
//
//export default {
//  title: "MapComponents/MlLayerSwipe",
//  component: MlLayerSwipe,
//  argTypes: {
//    url: {},
//    layer: {},
//  },
//  decorators: multiMapContextDecorator,
//};
//
//const Template = (args) => (
//  <TopToolbar>
//    <MlLayerSwipe
//      url={args.url}
//      layer={args.layer}
//      sourceOptions={args.sourceOptions}
//    />
//  </TopToolbar>
//);
//
//export const ExampleConfig = Template.bind({});
//ExampleConfig.parameters = {};
//ExampleConfig.args = {
//  url: "https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",
//  layer: "nw_uraufnahme_rw",
//  sourceOptions: {
//    minzoom: 13,
//    maxzoom: 20,
//  },
//};
////
