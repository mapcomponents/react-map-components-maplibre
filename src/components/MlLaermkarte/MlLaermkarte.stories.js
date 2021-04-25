import React, { useEffect, useContext } from "react";

import MlLaermkarte from "./MlLaermkarte";
import MlCompositeLayer from "../MlCompositeLayer/MlCompositeLayer";
import MlCameraFollowPath from "../MlCameraFollowPath/MlCameraFollowPath";
import { MapContext, SimpleDataProvider } from "react-map-components-core";
import DeckGlProvider from "../../deckgl_components/DeckGlProvider";

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

const route = [
  [7.09222, 50.725055],
  //[7.1579, 50.681],
  [7.0577, 50.7621],
];

const Template = (args) => {
  const mapContext = useContext(MapContext);

  useEffect(() => {
    if (!mapContext.mapExists()) return;

    mapContext.map.setCenter(route[0]);
    mapContext.map.setZoom(18);
    mapContext.map.setPitch(60);
  }, [mapContext.map]);

  return (
    <>
      <DeckGlProvider>
        <SimpleDataProvider format="json" url="/assets/laerm_points.json">
          <MlLaermkarte />
          <MlCompositeLayer
            paint={{
              "fill-extrusion-color": "hsl(30, 30, 30)",
            }}
            minZoom={14}
          />
          <MlCameraFollowPath path={route}></MlCameraFollowPath>
        </SimpleDataProvider>
      </DeckGlProvider>
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
