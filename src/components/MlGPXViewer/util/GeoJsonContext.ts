import React from "react";
import { FeatureCollection } from '@turf/turf';

type ContextProps = { 
    data: FeatureCollection,
    setData: Function,
    getEmptyFeatureCollection: Function
  };

const GeoJsonContext = React.createContext<Partial<ContextProps>>({});

export const GeoJsonContextProvider = GeoJsonContext.Provider;
export default GeoJsonContext;
