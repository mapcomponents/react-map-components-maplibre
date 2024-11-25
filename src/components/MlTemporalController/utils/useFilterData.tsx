import { featureCollection } from '@turf/turf';
import { FeatureCollection } from 'geojson';
import { useMemo } from 'react';
import useMap from '../../../hooks/useMap';

export interface useTemporalControllerProps {
	geojson: FeatureCollection;
	timeField: string;
	initialVal?: number;
	minVal?: number;
	maxVal?: number;
	mapId: string | undefined;
	}

function getMinVal(geojson: FeatureCollection | undefined, timeField: string) {
	if (geojson?.features) {
		const tempFeatures = [...(geojson.features ? geojson.features : [])];
		tempFeatures.sort((a, b) => (a.properties?.[timeField] < b.properties?.[timeField] ? 1 : -1));
		return tempFeatures[tempFeatures.length - 1]?.properties?.[timeField] || 0;
	}
	return 0;
}

function getMaxVal(geojson: FeatureCollection | undefined, timeField: string) {
	if (geojson?.features) {
		const tempFeatures = [...(geojson?.features ? geojson.features : [])];
		tempFeatures.sort((a, b) => (a.properties?.[timeField] < b.properties?.[timeField] ? -1 : 1));
		return tempFeatures[tempFeatures.length - 1]?.properties?.[timeField] || 0;
	}
	return 0;
}

export default function useFilterData(props: useTemporalControllerProps) {
	const mapHook = useMap({
		mapId: props.mapId,
	});

    const minVal = useMemo(() => {
		if (props.minVal) {
			return props.minVal;
		} 
		if (minVal  === undefined){
			return getMinVal(props.geojson, props.timeField);
		}
		
	}, [props.minVal, props.geojson, props.timeField]);

	const maxVal = useMemo(() => {
		if (props.maxVal) {
			return props.maxVal;
		}
		if (maxVal  === undefined){
		return getMaxVal(props.geojson, props.timeField);
		}
	}, [props.maxVal, props.geojson, props.timeField]);



	
	// filter geojson
	const filteredData = useMemo<FeatureCollection | undefined>(() => {
		if (props.geojson !== undefined && mapHook.map && minVal && maxVal) {
			return featureCollection(
				props.geojson.features.filter((e) => {
					return (
						e.properties?.[props.timeField] >= minVal &&
						e.properties?.[props.timeField] <= maxVal
					);
				})
			);
		}
		return;
	}, [props.geojson, mapHook.map, props.timeField]);


    return {filteredData, minVal, maxVal }
}
