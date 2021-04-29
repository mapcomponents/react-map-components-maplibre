import React, { useEffect, useContext } from "react";

import MlLaermkarte from "./MlLaermkarte";
import MlCompositeLayer from "../MlCompositeLayer/MlCompositeLayer";
import MlCameraFollowPath from "../MlCameraFollowPath/MlCameraFollowPath";
import { MapContext, SimpleDataProvider } from "react-map-components-core";
import DeckGlProvider from "../../deckgl_components/DeckGlProvider";
import { LoadingOverlayContext } from "../../ui_components/LoadingOverlayContext";

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
  //[7.09222, 50.725055],
  //[7.1579, 50.681],
  //[7.0577, 50.7621],
  [7.10942788610961, 50.708209240168],
  [7.10966149846967, 50.7088867160122],
  [7.10910082880551, 50.7108256986007],
  [7.10856352037736, 50.7126945974813],
  [7.1083532692533, 50.7142598002937],
  [7.10814301812924, 50.7160118929942],
  [7.10793276700518, 50.7169463424345],
  [7.10776923835314, 50.7176004570426],
  [7.10713848498096, 50.718838602551],
  [7.10699831756492, 50.7199599418793],
  [7.106900786313568, 50.72118132611057],
];

const Template = (args) => {
  const mapContext = useContext(MapContext);
  const loadingOverlayContext = useContext(LoadingOverlayContext);

  useEffect(() => {
    if (!mapContext.mapExists()) return;

    mapContext.map.setCenter(route[0]);
    mapContext.map.setPitch(60);
  }, [mapContext.map]);

  return (
    <>
      <DeckGlProvider
        init={() => loadingOverlayContext.setControlled(true)}
        onDone={() =>
          setTimeout(() => loadingOverlayContext.setLoadingDone(true), 1200)
        }
      >
        <SimpleDataProvider format="json" url="/assets/laerm_points.json">
          <MlLaermkarte />
          <MlCompositeLayer
            paint={{
              "fill-extrusion-color": "hsl(30, 30, 30)",
            }}
            minZoom={13}
          />
          <MlCameraFollowPath
            path={route}
            initialZoom={15.8}
            zoomOutTo={16.6}
            kmPerStep={0.008}
          ></MlCameraFollowPath>
        </SimpleDataProvider>
      </DeckGlProvider>
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
