import React, { useEffect, useState } from 'react';
import useMap from '../../hooks/useMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import useMapState from '../../hooks/useMapState';
export type MlOgcApiFeaturesProps = {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 * This layer will not be added to the maplibre-gl instance until a layer with an
	 * id that matches the value of insertBeforeLayer is created.
	 */
	insertBeforeLayer?: string;
	/**
	 * Id of the new layer and source that are added to the MapLibre instance
	 */
	layerId?: string;
	/**
	 * The url of OGC API
	 */
	ogcApiUrl: string;
};

const MlOgcApiFeatures = (props: MlOgcApiFeaturesProps) => {
	const [geojson, setGeojson] = useState();
	const mapHook = useMap({ mapId: props.mapId });
	const mapState = useMapState({
		watch: { layers: false, sources: false, viewport: true },
	});

	useEffect(() => {
		if (!mapHook.map) return;

		const bounds = mapHook.map.getBounds();
		const bbox =
			bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
		fetch(props.ogcApiUrl + '?limit=100&bbox=' + bbox)
			.then((res) => {
				if (!res.ok) throw new Error('Error fetching OGC features');

				return res.json();
			})
			.then((data) => {
				setGeojson(data);
			})
			.catch((error) => {
				console.log(error);
				setGeojson(undefined);
			});
	}, [mapHook.map, mapState.viewport]);

	return <>{geojson && <MlGeoJsonLayer geojson={geojson} />}</>;
};
export default MlOgcApiFeatures;
