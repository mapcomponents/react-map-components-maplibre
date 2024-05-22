import React, { useEffect, useState } from 'react';
//import useMap from "../../hooks/useMap";
import { featureCollection as createCollcetion, transformTranslate, Feature, FeatureCollection } from '@turf/turf';
import { LayerSpecification } from 'maplibre-gl';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';

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
	 * Distance between the original and the highlighted Features. Default value: 1
	 */
	offset?: number;
	/**
	 * Paint properties of the config object that is passed to the MapLibreGl.addLayer call. All
	 * available properties are documented in the MapLibreGl documentation
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

	function getHighlightFeature(feature: Feature) {
		const newFeature: Feature = transformTranslate(feature, 0.5, 0);
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
			setGeojson(createCollcetion(highlightedFeatures))
		}
	}, [props]);

	return <>
 {geojson && <MlGeoJsonLayer mapId={props.mapId} geojson={geojson} options={{paint: {"fill-color": "red" }}} />}
	</>;
};

MlHighlightFeature.defaultProps = {
	mapId: undefined,
};
export default MlHighlightFeature;
