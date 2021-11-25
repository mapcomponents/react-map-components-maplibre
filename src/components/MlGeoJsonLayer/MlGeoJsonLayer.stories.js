import React, { useState, useContext, useRef, useEffect } from "react";

import MlGeoJsonLayer from "./MlGeoJsonLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import { MapContext } from "@mapcomponents/react-core";

import sample_geojson_1 from "./assets/sample_1.json";
import sample_geojson_2 from "./assets/sample_2.json";

const storyoptions = {
  title: "MapComponents/MlGeoJsonLayer",
  component: MlGeoJsonLayer,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => {
  const mapContext = useContext(MapContext);
  const [geojson, setGeojson] = useState(sample_geojson_1);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!mapContext.getMap() || initializedRef.current) return;

    initializedRef.current = true;
    mapContext
      .getMap()
      .setCenter({ lng: 7.137609868988648, lat: 50.74746799549129 });
    mapContext.getMap().setZoom(9.5);

    setTimeout(() => {
      setGeojson(sample_geojson_2);
    }, 4000);
  }, [geojson, mapContext]);

  return (
    <>
      <MlGeoJsonLayer type="line" geojson={geojson} transitionTime={2000} />
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
