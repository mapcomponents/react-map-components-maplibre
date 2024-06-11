import React, { useEffect, useState } from 'react';
//import useMap from "../../hooks/useMap";
import {
	featureCollection as createCollection,
	FeatureCollection,
	Feature,
	Geometry,
} from '@turf/turf';
import { LayerSpecification } from 'maplibre-gl';
import MlGeoJsonLayer, { MlGeoJsonLayerProps } from '../MlGeoJsonLayer/MlGeoJsonLayer';
import createPolygonAroundLine from './utils/lineToPolygonconverter';

export interface MlHighlightFeatureProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * The Featrue or FeatureCollecion to be highlighted by the component.
	 */
	features: Feature[] | undefined;
	/**
	 * Distance between the original and the highlighted Features.
	 *
	 * For polygon features (line and polygon inputs), a positive value results in an inset, while a negative value results in an outset.
	 * For circle features (point input), negative values are not allowed; therefore, the absolute value will be used.
	 * Default value: -5
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
 * It takes a Feature Array and generate a new layer with a highlight of the given Features.
 *
 */

const defaultColor = 'red';

const MlHighlightFeature = (props: MlHighlightFeatureProps) => {
	const [geojson, setGeojson] = useState<FeatureCollection>();
	const [paint, setPaint] = useState<any>();
	const [layerType, setLayerType] = useState<MlGeoJsonLayerProps['type']>('circle');

	function getHighlightedFeature(feature: Feature) {
		console.log(feature);

		var newFeature: Feature = feature;
		switch (feature.geometry.type) {
			case 'Polygon':
				setPaint({ 'line-color': defaultColor, 'line-offset': props.offset, ...props.paint });
				setLayerType('line');
				break;

			case 'LineString':
				setPaint({ 'line-color': defaultColor, 'line-offset': props.offset, ...props.paint });
				setLayerType('line');

				// transform newFeature into a polygon that surrounds the line
				newFeature.geometry = createPolygonAroundLine(
					(newFeature.geometry as Geometry).coordinates,
					props.offset && props.offset * 1e-5
				);
				break;

			case 'Point':
				setLayerType('circle');
				setPaint({
					'circle-stroke-color': defaultColor,
					'circle-opacity': 0,
					'circle-radius': props.offset && Math.abs(props.offset),
					...props.paint,
				});

				break;
		}
		console.log(newFeature);
		return newFeature;
	}

	useEffect(() => {
		if (!props.features) {
			setGeojson(undefined);
			return;
		}
		const highlightedFeatures: Feature[] = [];
		props.features.forEach((feature: Feature) =>
			highlightedFeatures.push(getHighlightedFeature(feature))
		);
		setGeojson(createCollection(highlightedFeatures));
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
	offset: -5,
};
export default MlHighlightFeature;
