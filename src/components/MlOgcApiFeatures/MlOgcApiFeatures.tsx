import React, { useEffect, useRef, useState } from 'react';
import useMap from '../../hooks/useMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';

export type MlOgcApiFeaturesProps = {
	visible?: boolean;
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
	ogcApiUrl: URL;
	/**
	 * The additional query parameters of OGC API
	 */
	ogcApiFeatureParams?: OgcApiFeaturesParamsTypes;
};
export type OgcApiFeaturesParamsTypes = {
	bbox?: string;
	bbox_crs?: string;
	limit?: number;
	offset?: number;
	crs?: string;
	datetime?: string;
	properties?: string;
	sortby?: string;
	f?: string;
	filter?: string;
	lang?: string;
	q?: string;
	properties_crs?: string;
	id?: string;
	filter_lang?: string;
	filter_crs?: string;
};

const MlOgcApiFeatures = (props: MlOgcApiFeaturesProps) => {
	const [geojson, setGeojson] = useState();
	const mapHook = useMap({ mapId: props.mapId });
	const layerId = useRef(props.layerId || 'MlOgcApiFeature-' + mapHook.componentId);

	const buildOgcApiUrl = () => {
		const url = new URL(props.ogcApiUrl);
		if (props.ogcApiFeatureParams) {
			Object.entries(props.ogcApiFeatureParams).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					url.searchParams.append(key, value.toString());
				}
			});
		}
		return url.toString();
	};

	useEffect(() => {
		if (!mapHook.map) return;
		const ogcApiUrl = buildOgcApiUrl();

		fetch(ogcApiUrl) //  + '?limit=100&bbox=')
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
	}, [mapHook.map]);

	useEffect(() => {
		// if layer is not yet on map return
		if (!mapHook.map || !mapHook.map.map.style.getLayer(layerId.current)) return;

		// if layer is already on map: toggle layer visibility by changing the layout object's visibility property
		if (props.visible) {
			mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'visible');
		} else {
			mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'none');
		}
	}, [props.visible, mapHook.map]);

	return <>{geojson && <MlGeoJsonLayer geojson={geojson} layerId={layerId.current} />}</>;
};
export default MlOgcApiFeatures;
