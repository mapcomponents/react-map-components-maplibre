import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import useMap from '../../hooks/useMap';

import PropTypes from 'prop-types';
import { RasterLayerSpecification, RasterSourceSpecification } from 'maplibre-gl';

const defaultProps = {
	visible: true,
	urlParameters: {
		bbox: '{bbox-epsg-3857}',
		format: 'image/png',
		service: 'WMS',
		version: '1.1.1',
		request: 'GetMap',
		srs: 'EPSG:3857',
		width: 256,
		height: 256,
		styles: '',
	},
	attribution: '',
	sourceOptions: {
		minZoom: 0,
		maxZoom: 20,
	},
	layerOptions: {
		minZoom: 0,
		maxZoom: 20,
	},
};

export interface MlWmsLayerProps {
	urlParameters?: { [key: string]: string };
	url: string;
	visible?: boolean;
	attribution?: string;
	mapId?: string;
	sourceOptions?: RasterSourceSpecification;
	layerOptions?: RasterLayerSpecification;
	insertBeforeLayer?: string;
	layerId?: string;
}
/**
 * Adds a WMS raster source & layer to the maplibre-gl instance
 *
 * @param {object} props
 * @param {object} props.urlParameters URL query parameters that will be added to the WMS URL. A layers property (string) is mandatory. Any value defined on this attribute will extend the default object
 * @param {string} props.url WMS URL
 * @param {bool}	 props.visible Sets layer "visibility" property to "visible" if true or "none" if false
 * @param {string} props.attribution MapLibre attribution shown in the bottom right of the map, if this layer is visible
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 * @param {object} props.sourceOptions Object that is passed to the MapLibre.addSource call as config option parameter
 * @param {object} props.layerOptions Object that is passed to the MapLibre.addLayer call as config option parameter
 * @param {string} props.insertBeforeLayer Id of an existing layer in the mapLibre instance to help specify the layer order
																					 This layer will be visually beneath the layer with the "insertBeforeLayer" id
 *
 * @component
 */
const MlWmsLayer = (props: MlWmsLayerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const initializedRef = useRef(false);
	const layerId = useRef(props.layerId || 'MlWmsLayer-' + mapHook.componentId);

	const tileUrl = useMemo(() => {
		let _propsUrlParams;
		let _wmsUrl = props.url;
		if (props.url.indexOf('?') !== -1) {
			_propsUrlParams = props.url.split('?');
			_wmsUrl = _propsUrlParams[0];
		}
		const _urlParamsFromUrl = new URLSearchParams(_propsUrlParams?.[1]);
		// first spread in default props manually to enable overriding a single parameter without replacing the whole default urlParameters object
		const urlParamsObj = {
			...defaultProps.urlParameters,
			...Object.fromEntries(_urlParamsFromUrl),
			...props.urlParameters,
		};
		const urlParams = new URLSearchParams(urlParamsObj as unknown as Record<string, string>);
		const urlParamsStr =
			decodeURIComponent(urlParams.toString()) + ''.replace(/%2F/g, '/').replace(/%3A/g, ':');

		return _wmsUrl + '?' + urlParamsStr;
	}, [props.urlParameters, props.url]);

	const createLayer = useCallback(() => {
		if (!mapHook.map) return;

		initializedRef.current = true;

		if (mapHook.map.map.getLayer(layerId.current)) {
			mapHook.cleanup();
		}

		mapHook.map.addSource(
			layerId.current,
			{
				type: 'raster',
				tiles: [tileUrl],
				tileSize: 256,
				attribution: props.attribution,
				...props.sourceOptions,
			},
			mapHook.componentId
		);

		mapHook.map.addLayer(
			{
				id: layerId.current,
				type: 'raster',
				source: layerId.current,
				...props.layerOptions,
			},
			props.insertBeforeLayer,
			mapHook.componentId
		);

		// recreate layer if map style.json has changed
		mapHook.map.on(
			'styledata',
			() => {
				if (initializedRef.current && !mapHook.map?.map.getLayer(layerId.current)) {
					console.log('Recreate Layer ' + layerId.current);
					createLayer();
				}
			},
			mapHook.componentId
		);
		if (!props.visible) {
			mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'none');
		}
	}, [mapHook.map, props, tileUrl]);

	useEffect(() => {
		if (initializedRef.current) return;

		createLayer();
	}, [createLayer]);

	useEffect(() => {
		if (!mapHook.map || !mapHook.map?.map?.style?.sourceCaches?.[layerId.current] || !initializedRef.current) return;

		const source = mapHook.map.map.getSource(layerId.current) as RasterSourceSpecification;
		source.tiles = [tileUrl];

		mapHook.map.map.style.sourceCaches[layerId.current].clearTiles();

		mapHook.map.map.style.sourceCaches[layerId.current].update(mapHook.map.map.transform);

		mapHook.map.map.triggerRepaint();
	}, [mapHook.map, tileUrl]);

	useEffect(() => {
		if (!mapHook.map || !initializedRef.current) return;

		// toggle layer visibility by changing the layout object's visibility property
		if (props.visible) {
			mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'visible');
		} else {
			mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'none');
		}
	}, [props.visible, mapHook.map]);

	return <></>;
};

MlWmsLayer.defaultProps = {
	...defaultProps,
};

MlWmsLayer.propTypes = {
	/**
	 * WMS URL
	 */
	url: PropTypes.string.isRequired,
	/**
	 * URL query parameters that will be added to the WMS URL. A layers property (string) is mandatory. Any value defined on this attribute will extend the default object.
	 */
	urlParameters: PropTypes.shape({
		layers: PropTypes.string.isRequired,
		bbox: PropTypes.string,
		format: PropTypes.string,
		service: PropTypes.string,
		version: PropTypes.string,
		request: PropTypes.string,
		srs: PropTypes.string,
		width: PropTypes.number,
		height: PropTypes.number,
	}),
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId: PropTypes.string,
	/**
	 * MapLibre attribution shown in the bottom right of the map, if this layer is visible
	 */
	attribution: PropTypes.string,
	/**
	 * Object that is passed to the MapLibre.addLayer call as config option parameter
	 */
	layerOptions: PropTypes.object,
	/**
	 * Object that is passed to the MapLibre.addSource call as config option parameter
	 */
	sourceOptions: PropTypes.object,
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer: PropTypes.string,
	/**
	 * Sets layer "visibility" property to "visible" if true or "none" if false
	 */
	visible: PropTypes.bool,
};
export default MlWmsLayer;
