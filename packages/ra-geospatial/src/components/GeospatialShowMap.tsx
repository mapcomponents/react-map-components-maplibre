import React, { useEffect, useState } from 'react';
import { InputProps, useRecordContext } from 'react-admin';
import { parse as wellknownParse } from 'wellknown';
import { MapLibreMap, MlGeoJsonLayer, useMap } from '@mapcomponents/react-maplibre';
import { LngLatLike } from 'maplibre-gl';
import { feature, centroid } from '@turf/turf';
import { Feature } from '@turf/helpers';

export interface GeospatialShowMapProps extends InputProps<any> {
	MapLibreMapProps?: React.ComponentProps<typeof MapLibreMap>;
	embeddedMap?: boolean;
	mapId?: string;
}

function GeospatialShowMap(props: GeospatialShowMapProps) {
	const source = props.source;
	const record = useRecordContext();
	const mapHook = useMap();

	const [geojson, setGeojson] = useState<typeof feature>();
	useEffect(() => {
		if (!record?.[source]) return;

		const _geometry = wellknownParse(record[source]);

		if (_geometry) {
			setGeojson({
				type: 'Feature',
				properties: {},
				geometry: _geometry,
			} as unknown as typeof feature);
		}
	}, [record]);

	useEffect(() => {
		if (!mapHook.map || !geojson) return;

		const _center = centroid(geojson as typeof Feature);

		if (_center?.geometry?.coordinates) {
			mapHook.map.setCenter(_center.geometry.coordinates as LngLatLike);
		}
	}, [mapHook.map, geojson]);

	return (
		<>
			{props.embeddedMap && (
				<MapLibreMap
					{...props?.MapLibreMapProps}
					options={{
						zoom: 14,
						style: 'https://wms.wheregroup.com/tileserver/style/klokantech-basic.json',
						center: [0, 0],
						...props?.MapLibreMapProps?.options,
					}}
					style={{
						width: '100%',
						height: '400px',
						...props?.MapLibreMapProps?.style,
					}}
				/>
			)}

			{geojson && <MlGeoJsonLayer geojson={geojson}></MlGeoJsonLayer>}
		</>
	);
}

export default GeospatialShowMap;
