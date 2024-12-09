import React, { useState } from "react";
import { GeoJsonContextProvider } from "./GeoJsonContext";
import { FeatureCollection } from 'geojson';

interface geoJsonProviderValue {
	data: FeatureCollection;
	setData: (data: FeatureCollection) => void;
	getEmptyFeatureCollection: () => FeatureCollection;
}

const GeoJsonProvider = ({ children }:{children:JSX.Element}) => {
	const [data, setData] = useState<FeatureCollection>({
		type: "FeatureCollection",
		features: [],
	});
	const getEmptyFeatureCollection: () => FeatureCollection = () => {
		return {
			type: "FeatureCollection",
			features: [],
		};
	};
	const value: geoJsonProviderValue = {
		data,
		setData,
		getEmptyFeatureCollection,
	};

	return <GeoJsonContextProvider value={value}>{children}</GeoJsonContextProvider>;
};

export default GeoJsonProvider;
