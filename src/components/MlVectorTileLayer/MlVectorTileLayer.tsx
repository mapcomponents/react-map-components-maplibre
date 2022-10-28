import React, { useRef, useEffect, useCallback } from "react";
import useMap from '../../hooks/useMap';
import { LayerSpecification } from 'maplibre-gl';

interface MlVectorTileLayerProps {
	mapId?: string;
	insertBeforeLayer?: string;
	layerId?: string;
	sourceOptions?: any;
	url?: string;
	layers: [LayerSpecification];
}

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

	const layerIdsRef = useRef({});
	const layerId = useRef(props.layerId || 'MlVectorTileLayer-' + mapHook.componentId);
	const layerPaintConfsRef = useRef({});
	const layerLayoutConfsRef = useRef({});
	const initializedRef = useRef(false);

	const createLayer = useCallback(() => {
		if (!mapHook.map) return;

		initializedRef.current = true;

		if (mapHook.map.map.getLayer(layerId.current)) {
			mapHook.cleanup();
		}

		// Add the new layer to the maplibre instance once it is available
		mapHook.map.addSource(
			layerId.current,
			{
				type: 'vector',
				tiles: [props.url],
				tileSize: 512,
				attribution: '',
				...props.sourceOptions,
			},
			mapHook.componentId
		);

		props.layers?.map((layer) => {
			let _layerId = layerId.current + '_' + layer.id;
			layerIdsRef.current[layer.id] = _layerId;

			mapHook?.map?.addLayer(
				{
					source: layerId.current,
					minzoom: 0,
					maxzoom: 22,
					layout: {},
					paint: {
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
			mapHook?.map?.on(
				'styledata',
				() => {
					if (initializedRef.current && !mapHook.map?.map.getSource(layerId.current)) {
						console.log('Recreate Layer ' + layerId.current);
						createLayer();
					}
				},
				mapHook.componentId
			);
		});
	}, [mapHook.map, props]);

	useEffect(() => {
		if (initializedRef.current) return;

		createLayer();
	}, [createLayer]);

	useEffect(() => {
		if (!mapHook.map || !initializedRef.current) return;
		// initialize the layer and add it to the MapLibre-gl instance or do something else with it

		props.layers?.map((layer) => {
			if (mapHook?.map?.map.getLayer(layerIdsRef.current[layer.id])) {
				// update changed paint property
				let layerPaintConfString = JSON.stringify(layer.paint);

				if (layerPaintConfString !== layerPaintConfsRef.current[layer.id]) {
					for (let paintKey in layer.paint) {
						mapHook.map.map.setPaintProperty(
							layerIdsRef.current[layer.id],
							paintKey,
							layer.paint[paintKey]
						);
					}
				}
				layerPaintConfsRef.current[layer.id] = layerPaintConfString;

				// update changed layout property
				let layerLayoutConfString = JSON.stringify(layer.layout);

				if (layerLayoutConfString !== layerLayoutConfsRef.current[layer.id]) {
					for (let layoutKey in layer.layout) {
						mapHook.map.map.setLayoutProperty(
							layerIdsRef.current[layer.id],
							layoutKey,
							layer.layout[layoutKey]
						);
					}
				}
				layerLayoutConfsRef.current[layer.id] = layerLayoutConfString;
			}
		});
	}, [props.layers, mapHook.map]);

	return <></>;
};


export default MlVectorTileLayer;
