import React from "react";

import MlLaermkarte from "./MlLaermkarte";
import MlCompositeLayer from "../MlCompositeLayer/MlCompositeLayer";
import MlCameraFollowPath from "../MlCameraFollowPath/MlCameraFollowPath";
import { SimpleDataProvider } from "react-map-components-core";

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
    <SimpleDataProvider format="json" url="/assets/laerm_points.json">
      <MlLaermkarte />
      <MlCompositeLayer
        paint={{
          "fill-extrusion-color": "hsl(30, 30, 30)",
        }}
        minZoom={14}
      />
      <MlCameraFollowPath></MlCameraFollowPath>
    </SimpleDataProvider>
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
