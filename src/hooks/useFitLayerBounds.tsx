import useMap from "./useMap";
import { bbox, AllGeoJSON } from '@turf/turf';
import { LngLatBoundsLike, FitBoundsOptions, GeoJSONSource } from 'maplibre-gl';

export interface useFitLayerBoundsPros {
	layerId: string;
	type: "geojson" | "wms" | "vt";
	fitBoundsOptions?: FitBoundsOptions;
}

function useFitLayerBounds(props: useFitLayerBoundsPros) {
	const mapHook = useMap({ mapId: undefined });

	const layerSource = props.layerId ? mapHook?.map?.getLayer?.(props.layerId)?.source : undefined;

	if (!layerSource) {
		return;
	}

	const source = mapHook.map?.getSource(layerSource);
	let geojson: AllGeoJSON | undefined;

	if (source && (source as GeoJSONSource)._data) {
		geojson = (source as GeoJSONSource)._data as AllGeoJSON;
	} else if (layerSource) {
		const features = mapHook.map?.querySourceFeatures(layerSource);
		if (features && features.length > 0) {
			geojson = {
				type: 'FeatureCollection',
				features,
			} as AllGeoJSON;
		}
	}

	if (geojson) {
		mapHook.map?.fitBounds(
			bbox(geojson) as LngLatBoundsLike,
			props.fitBoundsOptions
		);
	}
}

export default useFitLayerBounds;
