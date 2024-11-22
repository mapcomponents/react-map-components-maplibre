import React, { useEffect, useRef } from 'react';

import useLayer from '../../hooks/useLayer';

import { v4 as uuidv4 } from 'uuid';

import getDefaultPaintPropsByType from './util/getDefaultPaintPropsByType';
import getDefaulLayerTypeByGeometry from './util/getDefaultLayerTypeByGeometry';
import { Feature, FeatureCollection,GeoJSON } from 'geojson';
import { useLayerProps } from '../../hooks/useLayer';
import useSource from '../../hooks/useSource';

import {
	LineLayerSpecification,
	CircleLayerSpecification,
	FillLayerSpecification,
	LayerSpecification,
	RasterLayerSpecification,
} from 'maplibre-gl';

export type MlGeoJsonLayerProps = {
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
	 * GeoJSON data that is supposed to be rendered by this component.
	 */
	geojson?:  Feature | FeatureCollection | undefined;
	/**
	 * Type of the layer that will be added to the MapLibre instance.
	 * All types from LayerSpecification union type are supported except the type from
	 * RasterLayerSpecification
	 */
	type?: Exclude<LayerSpecification['type'], RasterLayerSpecification['type']>;
	/**
	 * @deprecated The property should not be used. Please use the options.paint property instead. This will be removed in the next major release.
	 * Paint property object, that is passed to the addLayer call.
	 * Possible props depend on the layer type.
	 * See https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/
	 * Some examples are:
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
	 * All paint types from LayerSpecification union type are supported except the paint type from
	 * RasterLayerSpecification
	 */

	paint?: Exclude<LayerSpecification['paint'], RasterLayerSpecification['paint']>;
	/**
	 * @deprecated The property should not be used. Please use the options.layout property instead. This will be removed in the next major release.
	 * Layout property object, that is passed to the addLayer call.
	 * Possible props depend on the layer type.
	 * See https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/
	 * Some examples are:
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
	 * All layout types from LayerSpecification union type are supported except the layout type from
	 * RasterLayerSpecification

	 */
	layout?: LayerSpecification['layout'];

	/**
	 * Javascript object that is spread into the addLayer commands first parameter.
	 */
	options?: useLayerProps['options'];
	/**
	 * Javascript object with optional properties "fill", "line", "circle" to override implicit layer type default paint properties.
	 */
	defaultPaintOverrides?: {
		circle?: CircleLayerSpecification['paint'];
		fill?: FillLayerSpecification['paint'];
		line?: LineLayerSpecification['paint'];
	};
	/**
	 * Property name in the GeoJSON object to be used as a label.
	 */
	labelProp?: string;
	/**
	 * Label configuration options.
	 */
	labelOptions?: useLayerProps['options'];

	/**
	 * Hover event handler that is executed whenever a geometry rendered by this component is hovered.
	 */
	onHover?: useLayerProps['onHover'];
	/**
	 * Click event handler that is executed whenever a geometry rendered by this component is clicked.
	 */
	onClick?: useLayerProps['onClick'];
	/**
	 * Leave event handler that is executed whenever a geometry rendered by this component is
	 * left/unhovered.
	 */
	onLeave?: useLayerProps['onLeave'];
};

/**
 * Adds source and layer to display GeoJSON data on the map.
 *
 * @component
 */

const MlGeoJsonLayer = (props: MlGeoJsonLayerProps) => {
	const layerType = props.type || getDefaulLayerTypeByGeometry(props.geojson);
	const layerId = useRef(props.layerId || 'MlGeoJsonLayer-' + uuidv4());
	const labelLayerId = `label-${layerId.current}`;

	useEffect(() => {
		if (!props.layerId) {
			layerId.current = 'MlGeoJsonLayer-' + uuidv4();
		} else {
			layerId.current = props.layerId;
		}
	}, [props.layerId]);

	useSource({
		mapId: props.mapId,
		sourceId: 'source-' + layerId.current,
		source: {
			type: 'geojson',
			data: props.geojson as unknown as (string | GeoJSON),
			...(typeof props?.options?.source !== 'undefined' &&
			typeof props?.options?.source !== 'string'
				? props.options.source
				: {}),
		},
	});

	useLayer({
		mapId: props.mapId,
		layerId: layerId.current,
		options: {					
			...(typeof props?.options?.source !== 'undefined' &&
						typeof props?.options?.source === 'string'
							? {source: props.options.source}
							: {source: 'source-' + layerId.current}),				
			paint: {
				...(props.paint || getDefaultPaintPropsByType(layerType, props.defaultPaintOverrides)),
				...props?.options?.paint,
			},
			layout: {
				...(props?.layout || {}),
				...props?.options?.layout,
			},
			type: layerType as LayerSpecification['type'],
		} as useLayerProps['options'],
		insertBeforeLayer: props.insertBeforeLayer,
		onHover: props.onHover,
		onClick: props.onClick,
		onLeave: props.onLeave,
	});

	// Label useLayer hook can't be called conditionally.
	// Using it with geojson and options.source undefined will cause it to return without creating a layer.
	useLayer({
		mapId: props.mapId,
		options: {
			...(typeof props?.options?.source !== 'undefined' &&
						typeof props?.options?.source === 'string'
							? {source: props.options.source}
							: {source: 'source-' + layerId.current}),						
			id: labelLayerId,
			type: 'symbol',
			maxzoom: 24,
			minzoom: 1,
			...(props?.labelOptions ? props.labelOptions : {}),
			...(props?.options?.filter ? { filter: props.options.filter } : {}),
			layout: {
				'text-font': ['Open Sans Regular'],
				'text-field': `{${props.labelProp}}`,
				'text-size': 12,
				'text-anchor': 'top',
				...(props?.labelOptions?.layout ? props.labelOptions.layout : {}),
				...(props?.layout?.visibility ? { visibility: props.layout.visibility } : {}),
			},
			paint: {
				'text-halo-width': 1,
				'text-halo-color': '#fefefe',
				'text-color': '#121212',
				...(props?.labelOptions?.paint ? props.labelOptions.paint : {}),
			},
		} as useLayerProps['options'],
	});

	return <></>;
};

export default MlGeoJsonLayer;
