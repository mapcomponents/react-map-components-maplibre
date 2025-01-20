import React from "react";
import { FeatureCollection } from "geojson";

type ContextProps = {
	data: FeatureCollection;
	setData: (data: FeatureCollection) => void;
	getEmptyFeatureCollection: () => FeatureCollection;
};

const GeoJsonContext = React.createContext<Partial<ContextProps>>({});

export const GeoJsonContextProvider = GeoJsonContext.Provider;
export default GeoJsonContext;
