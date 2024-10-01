import React, { useEffect, useRef, useState } from 'react';
import useMap from '../../hooks/useMap';
import MlGeoJsonLayer, { MlGeoJsonLayerProps } from '../MlGeoJsonLayer/MlGeoJsonLayer';
export type MlOgcApiFeaturesProps = {
	visible?: boolean;
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * The url of OGC API
	 */
	ogcApiUrl: URL;
	/**
	 * The additional query parameters of OGC API
	 */
	ogcApiFeatureParams?: OgcApiFeaturesParamsTypes;
	/**
	 * Fetches the features everytime (based on the current bbox) when the map gets moved
	 */
	reloadFeaturesOnMapMove?: boolean;
	/**
	 * Geojson Layer props. But omit 'geojson' because it gets set from the OGC API Feature call
	 */
	mlGeoJsonLayerProps?: Omit<MlGeoJsonLayerProps, 'geojson'>;
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
	const layerId = useRef(
		props.mlGeoJsonLayerProps?.layerId || 'MlOgcApiFeature-' + mapHook.componentId
	);

	const buildOgcApiUrl = () => {
		const url = new URL(props.ogcApiUrl);
		if (props.ogcApiFeatureParams) {
			Object.entries(props.ogcApiFeatureParams).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					url.searchParams.append(key, value.toString());
				}
			});
		}
		if (props.reloadFeaturesOnMapMove) {
			const southWest = mapHook?.map?.getBounds().getSouthWest();
			const northEast = mapHook?.map?.getBounds().getNorthEast();
			const bbox = `${southWest?.lng},${southWest?.lat},${northEast?.lng},${northEast?.lat}`;
			url.searchParams.append('bbox', bbox);
		}
		return url.toString();
	};

	useEffect(() => {
		if (!mapHook.map) return;
		const getDataHandler = () => {
			const generatedOgcApiUrl = buildOgcApiUrl();
			fetch(generatedOgcApiUrl)
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
		};
		getDataHandler();
		if (props.reloadFeaturesOnMapMove) {
			mapHook.map.on('moveend', getDataHandler);
		}

		return () => {
			if (mapHook?.map?.off) {
				mapHook.map.off('moveend', getDataHandler);
			}
		}
	}, [mapHook.map, props.ogcApiFeatureParams, props.ogcApiUrl]);

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

	return (
		<>
			{geojson && (
				<MlGeoJsonLayer
					geojson={geojson}
					layerId={layerId.current}
					{...props.mlGeoJsonLayerProps}
				/>
			)}
		</>
	);
};
export default MlOgcApiFeatures;
