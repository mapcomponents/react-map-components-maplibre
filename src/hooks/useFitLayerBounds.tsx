
import useMap from "./useMap";
import { bbox } from '@turf/turf';
import { LngLatBoundsLike, FitBoundsOptions, GeoJSONSource } from 'maplibre-gl';


export interface useFitLayerBoundsPros {
	layerId: string,
	type: "geojson"| "wms" | "vt",
	fitBoundsOptions?: FitBoundsOptions
}
 function useFitLayerBounds(props: useFitLayerBoundsPros){

	const mapHook = useMap({ mapId: undefined });
	const layerSource = props.layerId ? mapHook.map?.getLayer(props.layerId).source : undefined;
	const geojson = layerSource && (mapHook.map?.getSource(layerSource) as GeoJSONSource)._data;
	const _geojson = layerSource && {
		type: 'FeatureCollection',
		features: mapHook.map?.querySourceFeatures(layerSource)
	};


	if (!layerSource) {
		return;
	}

	mapHook.map?.fitBounds(typeof geojson === 'string' ? bbox(_geojson) as LngLatBoundsLike : bbox(geojson) as LngLatBoundsLike,
		props.fitBoundsOptions
		);
}

export default useFitLayerBounds;
