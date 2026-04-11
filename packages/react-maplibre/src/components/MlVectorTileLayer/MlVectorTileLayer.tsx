import { useRef, useEffect, useCallback } from 'react';
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
	const layerPaintConfsRef = useRef<{ [key: string]: string }>({});
	const layerLayoutConfsRef = useRef<{ [key: string]: string }>({});
	const initializedRef = useRef(false);
	const isCreatingRef = useRef(false);

	// Keep a stable ref to latest props so callbacks don't need to re-create
	// every time props change (prevents the init effect from re-firing).
	const propsRef = useRef(props);
	propsRef.current = props;

	const createLayers = useCallback(() => {
		if (!mapHook.map) return;
		// Prevent concurrent/reentrant calls that would cause "already exists" errors.
		if (isCreatingRef.current) return;
		isCreatingRef.current = true;
		try {
			const { url, layers, sourceOptions, insertBeforeLayer } = propsRef.current;

			initializedRef.current = true;

			if (mapHook.map.map.getSource(layerId.current)) {
				mapHook.cleanup();
			}

			// Guard: only add if cleanup didn't leave a stale entry (e.g. race condition).
			if (!mapHook.map.map.getSource(layerId.current)) {
				mapHook.map.addSource(
					layerId.current,
					{
						type: 'vector',
						tiles: [url || ''],
						attribution: '',
						minzoom: 0,
						maxzoom: 14,
						...sourceOptions,
					},
					mapHook.componentId
				);
			}

			layers.forEach((layer) => {
				if (!mapHook.map) return;
				if (mapHook.map.map.getLayer(layer.id)) {
					mapHook.map.map.removeLayer(layer.id);
				}
				mapHook.map.addLayer(
					{
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
						// source must come after the spread so layer.source can't override it
						source: layerId.current,
					},
					insertBeforeLayer,
					mapHook.componentId
				);
				layerPaintConfsRef.current[layer.id] = JSON.stringify(layer.paint);
				layerLayoutConfsRef.current[layer.id] = JSON.stringify(layer.layout);
			});
		} finally {
			isCreatingRef.current = false;
		}
	// Only depends on the map hook — props are read from propsRef so this stays
	// stable across prop changes, preventing unnecessary layer teardown/recreation.
	}, [mapHook.map, mapHook.cleanup, mapHook.componentId]);	const updateLayers = useCallback(() => {
		if (!initializedRef.current) return;

		propsRef.current.layers.forEach((layer) => {
			if (!mapHook.map) return;
			if (mapHook.map.map.getLayer(layer.id)) {
				// update changed paint property
				const layerPaintConfString = JSON.stringify(layer.paint);

				if (layerPaintConfString !== layerPaintConfsRef.current[layer.id]) {
					for (const paintKey in layer.paint) {
						mapHook.map.setPaintProperty(
							layer.id,
							paintKey,
							layer.paint[paintKey as keyof typeof layer.paint]
						);
					}
				}
				layerPaintConfsRef.current[layer.id] = layerPaintConfString;

				// update changed layout property
				const layerLayoutConfString = JSON.stringify(layer.layout);

				if (layerLayoutConfString !== layerLayoutConfsRef.current[layer.id]) {
					for (const layoutKey in layer.layout) {
						mapHook.map.setLayoutProperty(
							layer.id,
							layoutKey,
							layer.layout[layoutKey as keyof typeof layer.layout]
						);
					}
				}
				layerLayoutConfsRef.current[layer.id] = layerLayoutConfString;
			}
		});
	}, [mapHook.map]);

	// Initial layer creation — fires once when the map becomes available.
	useEffect(() => {
		if (initializedRef.current) return;
		createLayers();
	}, [createLayers]);

	// Recreate source+layers after a base-style reload wipes them.
	// Registered once per map lifetime, not inside createLayers, to avoid
	// accumulating duplicate handlers on every createLayers call.
	useEffect(() => {
		if (!mapHook.map) return;
		const handler = () => {
			if (initializedRef.current && !mapHook.map?.map.getSource(layerId.current)) {
				createLayers();
			}
		};
		mapHook.map.on('styledata', handler, mapHook.componentId);
		return () => { mapHook.map?.off('styledata', handler); };
	}, [mapHook.map, mapHook.componentId, createLayers]);

	// Full recreate when layer count changes.
	// Only fires after the init effect has run (initializedRef guard).
	// Does NOT include mapHook.map in deps to avoid double-firing on first mount.
	useEffect(() => {
		if (!mapHook.map || !initializedRef.current) return;
		createLayers();
	}, [props.layers.length]); // intentionally omits mapHook.map to avoid double-firing on first mount

	// Cheap property-level updates for paint/layout changes.
	useEffect(() => {
		if (!mapHook.map || !initializedRef.current) return;
		updateLayers();
	}, [props.layers, mapHook.map]);

	return <></>;
};

export default MlVectorTileLayer;
