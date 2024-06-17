import React, { useRef, useEffect, useCallback } from 'react';
import useMap from '../../hooks/useMap';
import { LayerSpecification } from 'maplibre-gl';
import { VectorSourceSpecification } from 'maplibre-gl';

export type ExtendedLayerSpecification = LayerSpecification & {
	masterVisible?: boolean;
};

export type MlVectorTileLayerProps = {
	mapId?: string;
	insertBeforeLayer?: string;
	layerId?: string;
	sourceOptions?: VectorSourceSpecification;
	url?: string;
	layers: ExtendedLayerSpecification[];
};

/**
 * Adds a vector-tile source and 0...n vector-tile-layers to the MapLibre instance referenced by
 * props.mapId
 *
 * @component
 */
const MlVectorTileLayer = (props: MlVectorTileLayerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const layerId = useRef(props.layerId || 'MlVectorTileLayer-' + mapHook.componentId);
	const layerPaintConfsRef = useRef({});
	const layerLayoutConfsRef = useRef({});
	const initializedRef = useRef(false);

	const createLayers = useCallback(() => {
		if (!mapHook.map) return;

		initializedRef.current = true;

		if (mapHook.map.map.getSource(layerId.current)) {
			mapHook.cleanup();
		}

		// Add the new layer to the maplibre instance once it is available
		if (!mapHook.map.map.getSource(layerId.current)) {
			mapHook.map.addSource(
				layerId.current,
				{
					type: 'vector',
					tiles: [props.url || ''],
					attribution: '',
					minzoom: 0,
					maxzoom: 14,
					...props.sourceOptions,
				},
				mapHook.componentId
			);
		}

		props.layers.forEach((layer) => {
			if (!mapHook.map) return;
			mapHook.map.addLayer(
				{
					source: layerId.current,
					minzoom: 0,
					maxzoom: 22,
					layout: {},
					paint: {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						'line-opacity': 0.5,
						'line-color': 'rgb(80, 80, 80)',
						'line-width': 2,
					},
					...layer,
				},
				props.insertBeforeLayer,
				mapHook.componentId
			);
			layerPaintConfsRef.current[layer.id] = JSON.stringify(layer.paint);
			layerLayoutConfsRef.current[layer.id] = JSON.stringify(layer.layout);

			// recreate layer if style has changed
			mapHook.map.on(
				'styledata',
				() => {
					if (initializedRef.current && !mapHook.map?.map.getSource(layerId.current)) {
						console.log('Recreate Layer ' + layerId.current);
						createLayers();
					}
				},
				mapHook.componentId
			);
		});
	}, [mapHook.map, props]);

	const updateLayers = useCallback(() => {
		if (!initializedRef.current) return;

		props.layers.forEach((layer) => {
			if (!mapHook.map) return;
			if (mapHook.map.map.getLayer(layer.id)) {
				// update changed paint property
				const layerPaintConfString = JSON.stringify(layer.paint);

				if (layerPaintConfString !== layerPaintConfsRef.current[layer.id]) {
					for (const paintKey in layer.paint) {
						mapHook.map.map.setPaintProperty(layer.id, paintKey, layer.paint[paintKey]);
					}
				}
				layerPaintConfsRef.current[layer.id] = layerPaintConfString;

				// update changed layout property
				const layerLayoutConfString = JSON.stringify(layer.layout);

				if (layerLayoutConfString !== layerLayoutConfsRef.current[layer.id]) {
					for (const layoutKey in layer.layout) {
						mapHook.map.map.setLayoutProperty(layer.id, layoutKey, layer.layout[layoutKey]);
					}
				}
				layerLayoutConfsRef.current[layer.id] = layerLayoutConfString;
			}
		});
	}, [mapHook.map, props.layers]);

	// initial layer creation
	useEffect(() => {
		if (initializedRef.current) return;
		createLayers();
	}, [createLayers]);

	// if layers get removed or added
	useEffect(() => {
		if (!mapHook.map || !initializedRef.current) return;
		createLayers();
	}, [props.layers.length, mapHook.map]);

	// on layout/paint update
	useEffect(() => {
		if (!mapHook.map || !initializedRef.current) return;
		updateLayers();
	}, [props.layers, mapHook.map]);

	return <></>;
};

export default MlVectorTileLayer;
