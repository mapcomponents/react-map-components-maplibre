import React, { useState } from "react";
import { GeoJsonContextProvider } from "./GeoJsonContext";
import { FeatureCollection } from '@turf/turf';

const GeoJsonProvider = ({ children }:{children:JSX.Element}) => {
  const [data, setData] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });
  const getEmptyFeatureCollection = () => {
    return {
      type: "FeatureCollection",
      features: [],
    };
  };
  const value = {
    data,
    setData,
    getEmptyFeatureCollection,
  };

  return <GeoJsonContextProvider value={value}>{children}</GeoJsonContextProvider>;
};

export default GeoJsonProvider;
