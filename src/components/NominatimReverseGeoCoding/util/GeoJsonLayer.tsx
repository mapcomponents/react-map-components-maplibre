import React from "react";
import MlGeoJsonLayer from "../../MlGeoJsonLayer/MlGeoJsonLayer";
import { SxProps } from "@mui/material";

export type GeoJsonLayerProps = {
	geojson?: any;
	lng: number | undefined;
	lat: number | undefined;
	polygonStyles?: SxProps;
};

export default function GeoJsonLayer({ geojson, lng, lat, polygonStyles }: GeoJsonLayerProps) {
	if (geojson?.type === "Point") {
		const geometry = {
			type: "Point" as const,
			coordinates: [lng, lat],
		};

		const geojsonData = {
			type: "FeatureCollection" as const,
			features: [
				{
					type: "Feature" as const,
					geometry,
					properties: {},
				},
			],
		};

		const paint = {
			"circle-color": "#00abef",
			"circle-radius": 6,
			"circle-stroke-width": 2,
			"circle-stroke-color": "#ffffff",
		};

		return (
			<MlGeoJsonLayer
				type="circle"
				options={{
					source: {
						type: "geojson",
						data: geojsonData,
					} as any,
					paint: paint,
				}}
				labelOptions={{
					layout: {
						"text-size": ["interpolate", ["linear"], ["zoom"], 13, 15, 22, 60],
					},
					minzoom: 13,
				}}
			/>
		);
	} else if (geojson) {
		return (
			<MlGeoJsonLayer
				geojson={geojson}
				type="line"
				options={{
					paint: {
						"line-color": "#00abef",
						"line-width": 3,
						...polygonStyles,
					},
				}}
			/>
		);
	} else {
		return null;
	}
}
