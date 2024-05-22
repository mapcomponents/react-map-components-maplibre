import React, { useEffect, useState } from 'react';
//import useMap from "../../hooks/useMap";
import {
	featureCollection as createCollection,
	Feature,
	FeatureCollection,
} from '@turf/turf';
import { LayerSpecification } from 'maplibre-gl';
import MlGeoJsonLayer, { MlGeoJsonLayerProps } from '../MlGeoJsonLayer/MlGeoJsonLayer';

export interface MlHighlightFeatureProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * The Featrue or FeatureCollecion to be highlighted by the component.
	 */
	features: Feature | FeatureCollection | undefined;
	/**
	 * Distance between the original and the highlighted Features.
	 * For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. 
	 * For polygon features, a positive value results in an inset, and a negative value results in an outset. 
	 * Default value: 0
	 */
	offset?: number;
	/**
	 * Paint properties of the config object that is passed to the MapLibreGl.addLayer call.
	 * The paint properties must be compatible with the output type: 
	 * For polygon and line inputs ---> Line Type 
	 * For circle inputs ----> circle Type
	 * All available properties are documented in the MapLibreGl documentation
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill-extrusion
	 */

	paint?: LayerSpecification['paint'];
}

/**
 * It takes a single Feature or a FeatureCollection and generate a new Layer with a highlight of the given Features.
 *
 */
const MlHighlightFeature = (props: MlHighlightFeatureProps) => {
	// const mapHook = useMap({
	// 	mapId: props.mapId,
	// });
	const [geojson, setGeojson] = useState<Feature | FeatureCollection>();
	const [paint, setPaint] = useState<any>();
	const [layerType, setLayerType] = useState<MlGeoJsonLayerProps['type']>('circle');

	function getHighlightFeature(feature: Feature) {
		var newFeature: Feature = feature;

		switch (feature.geometry.type) {
			case 'Polygon':
				// newFeature = transformTranslate(feature, 0.5, 0) --->  Hier wird den Offset für die Linie definiert
				setPaint({ 'line-color': 'red', 'line-offset': props.offset || 0 , ...props.paint });
				setLayerType('line');
		}

		return newFeature;
	}

	useEffect(() => {
		if (!props.features) {
			setGeojson(undefined);
			return;
		}

		if (props.features?.type === 'Feature') {
			setGeojson(getHighlightFeature(props.features));
		} else if (props.features?.type === 'FeatureCollection') {
			const highlightedFeatures: Feature[] = [];
			props.features.features.forEach((feature: Feature) =>
				highlightedFeatures.push(getHighlightFeature(feature))
			);
			setGeojson(createCollection(highlightedFeatures));
		}
	}, [props]);

	return (
		<>
			{geojson && (
				<MlGeoJsonLayer
					mapId={props.mapId}
					geojson={geojson}
					type={layerType}
					options={{ paint: paint }}
				/>
			)}
		</>
	);
};

MlHighlightFeature.defaultProps = {
	mapId: undefined,
};
export default MlHighlightFeature;
