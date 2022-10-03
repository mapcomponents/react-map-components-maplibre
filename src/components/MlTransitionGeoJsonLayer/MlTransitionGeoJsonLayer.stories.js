import React, { useState, useContext, useRef, useEffect } from "react";

import MlTransitionGeoJsonLayer from "./MlTransitionGeoJsonLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import useMap from "../../hooks/useMap";

import sample_geojson_1 from "./assets/sample_1.json";
import sample_geojson_2 from "./assets/sample_2.json";
import sample_polygon_geojson_1 from "./assets/sample_polygon_1.json";

console.log(sample_polygon_geojson_1);
const storyoptions = {
	title: "MapComponents/MlTransitionGeoJsonLayer",
	component: MlTransitionGeoJsonLayer,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const LinestringTransitionTemplate = (props) => {
	const mapHook = useMap({mapId: 'map_1'});
	const [geojson, setGeojson] = useState(sample_geojson_1);
	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		console.log('Hello')
		initializedRef.current = true;
		mapHook.map.setCenter({ lng: 7.137609868988648, lat: 50.74746799549129 });
		mapHook.map.setZoom(9.5);

		setTimeout(() => {
			setGeojson(sample_geojson_2);
		}, 4000);
	}, [geojson, mapHook.map]);

	return (
		<>
			<MlTransitionGeoJsonLayer type="line" geojson={geojson} transitionTime={2000} {...props} />
		</>
	);
};

export const Linestring = LinestringTransitionTemplate.bind({});
Linestring.parameters = {};
Linestring.args = {
	paint: { "line-color": "red", "line-width": 4 },
};