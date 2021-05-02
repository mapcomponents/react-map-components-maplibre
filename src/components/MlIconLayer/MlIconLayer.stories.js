import React, { useEffect, useState, useContext } from "react";
import * as d3 from "d3";

import MlIconLayer from "./MlIconLayer";

import DeckGlProvider from "../../deckgl_components/DeckGlProvider";
import mapContextDecorator from "../../decorators/MapContextKlokantechBasicDecorator";
import { MapContext, SimpleDataProvider } from "react-map-components-core";
import { LoadingOverlayContext } from "../../ui_components/LoadingOverlayContext";
import destinationPoint from "./assets/destinationPoint";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlIconLayer",
  component: MlIconLayer,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};

const Template = (args) => {
  const mapContext = useContext(MapContext);
  const loadingOverlayContext = useContext(LoadingOverlayContext);

  const [dataUrl, setDataUrl] = useState(
    "https://opensky-network.org/api/states/all"
  );

  const renewDataUrl = () => {
    setDataUrl(dataUrl);
    setTimeout(renewDataUrl, 10000);
  };

  useEffect(() => {
    renewDataUrl();
  }, []);

  return (
    <DeckGlProvider>
      <SimpleDataProvider
        format="json"
        url={dataUrl}
        formatData={(d) => ({
          callsign: d[1],
          longitude: d[5],
          latitude: d[6],
          velocity: d[9],
          altitude: d[13],
          origin_country: d[2],
          true_track: -d[10],
          interpolatePos: d3.geoInterpolate(
            [d[5], d[6]],
            destinationPoint(d[5], d[6], d[9] * 10, d[10])
          ),
        })}
        data_property="states"
        loadingDone={(sdp) => {}}
      >
        <MlIconLayer />
      </SimpleDataProvider>
    </DeckGlProvider>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
