import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GeoJsonContextProvider } from "./GeoJsonContext";

const GeoJsonProvider = ({ children }) => {
  const [data, setData] = useState({
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
    getEmptyFeatureCollection
  };

  return <GeoJsonContextProvider value={value}>{children}</GeoJsonContextProvider>;
};

GeoJsonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GeoJsonProvider;
