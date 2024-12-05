import { useState, useEffect, useCallback, useRef } from 'react';

import useMap, { useMapType } from './useMap';

import {
	GeoJSONSourceSpecification,
	LayerSpecification,
	MapMouseEvent,
	Style,
	MapEventType,
	Map,
	FilterSpecification,
	MapGeoJSONFeature,
} from 'maplibre-gl';

import MapLibreGlWrapper, {
	MapLibreGlWrapperEventHandlerType,
} from '../components/MapLibreMap/lib/MapLibreGlWrapper';

import { Feature, FeatureCollection, GeoJsonObject } from 'geojson';

type getLayerType = Style['getLayer'];

type useLayerType = {
	map: MapLibreGlWrapper | undefined;
	layer: ReturnType<getLayerType> | undefined;
	layerId: string;
	componentId: string;
	mapHook: useMapType;
};

export type MapEventHandler = (
	ev: MapMouseEvent & {
		features?: Feature[] | undefined;
	} & Record<string, unknown>
) => void;

export interface useLayerProps {
	mapId?: string;
	layerId?: string;
	idPrefix?: string;
	insertBeforeLayer?: string;
	insertBeforeFirstSymbolLayer?: boolean;
	geojson?: GeoJsonObject | Feature | FeatureCollection;
	options: Partial<
		LayerSpecification & {
			source?: GeoJSONSourceSpecification | string;
			id?: string;
			filter?: FilterSpecification;
		}
	>;
	onHover?: (ev: MapEventType & unknown) => Map | void;
	onClick?: (ev: MapEventType & unknown) => Map | void;
	onLeave?: (ev: MapEventType & unknown) => Map | void;
}
type PaintPropsKeyType = keyof useLayerProps['options']['paint'];

const legalLayerTypes = [
	'fill',
	'line',
	'symbol',
	'circle',
	'heatmap',
	'fill-extrusion',
	'raster',
	'hillshade',
	'background',
];

function determineSource(props: useLayerProps) {
	if (typeof props.options.source === 'string') {
		return {
			source: props.options.source,
		};
	} else if (
		props.geojson &&
		(!props.options?.source ||
			(typeof props?.options?.source !== 'string' &&
				props.options?.source?.attribution &&
				!props.options?.source?.type))
	) {
		return {
			source: {
				type: 'geojson',
				data: props.geojson || '',
				attribution:
					typeof props?.options?.source !== 'string' && props.options.source?.attribution
						? props.options.source?.attribution
						: '',
			},
		};
	}

	return {};
}

function determineInsertionPoint(props: useLayerProps, mapHook: useMapType) {
	if (props?.insertBeforeLayer) return props.insertBeforeLayer;
	if (props?.insertBeforeFirstSymbolLayer) return mapHook?.map?.firstSymbolLayer;
	return undefined;
}

function useLayer(props: useLayerProps): useLayerType {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const layerTypeRef = useRef<string>('');
	const layerPaintConfRef = useRef<string>('');
	const layerLayoutConfRef = useRef<string>('');

	const [layer, setLayer] = useState<ReturnType<getLayerType>>();

	const layerId = useRef(
		props.layerId || (props.idPrefix ? props.idPrefix : 'Layer-') + mapHook.componentId
	);

	const createLayer = useCallback(() => {
		if (!mapHook.map || mapHook?.map.cancelled) return;

		if (mapHook.map.map.getLayer(layerId.current)) {
			mapHook.cleanup();
		}
		if (typeof props?.options?.source !== 'string' && mapHook.map.map.getSource(layerId.current)) {
			mapHook.map.map.removeSource(layerId.current);
		}

		if (typeof props.options.source === 'string') {
			if (props.options.source === '' || !mapHook.map.map.getSource(props.options.source)) {
				return;
			}
		}
		if (
			typeof props?.options?.source !== 'string' &&
			!props.geojson &&
			!props?.options?.source?.data &&
			props?.options?.type !== 'background'
		) {
			return;
		}

		if (typeof props.options.type === 'undefined') {
			return;
		}

		try {
			mapHook.map.addLayer(
				{
					...props.options,
					...determineSource(props),
					id: layerId.current,
				} as LayerSpecification,
				determineInsertionPoint(props, mapHook),
				mapHook.componentId
			);
		} catch (error) {
			console.error('Failed to add layer:', error);
		}
		setLayer(() => mapHook.map?.map.getLayer(layerId.current));

		// recreate layer if style has changed
		const styledataEventHandler = () => {
			if (!mapHook.map?.map.getLayer(layerId.current)) {
				createLayer();
			}
		};
		mapHook.map.on('styledata', styledataEventHandler, mapHook.componentId);
		const addSourceHandler = (
			_ev: any,
			_wrapper: MapLibreGlWrapper,
			{ source_id }: { source_id: string }
		) => {
			if (
				mapHook.map &&
				typeof props?.options?.source === 'string' &&
				props.options.source === source_id
			) {
				createLayer();
			}
		};
		mapHook.map.wrapper.on(
			'addsource',
			addSourceHandler as unknown as MapLibreGlWrapperEventHandlerType,
			mapHook.componentId
		);

		layerPaintConfRef.current = JSON.stringify(props.options?.paint);
		layerLayoutConfRef.current = JSON.stringify(props.options?.layout);
		layerTypeRef.current = props.options.type as LayerSpecification['type'];
	}, [props, mapHook]);




	useEffect(() => {
		if (!mapHook.map) return;
		if (!props.geojson && !props.options.source && props?.options?.type !== 'background') return;

		if (
			mapHook.map?.cancelled === false &&
			mapHook?.map?.map?.getLayer?.(layerId.current) &&
			(legalLayerTypes.indexOf(props.options.type as LayerSpecification['type']) === -1 ||
				(legalLayerTypes.indexOf(props.options.type as LayerSpecification['type']) !== -1 &&
					props.options.type === layerTypeRef.current))
		) {
			return;
		}
		createLayer();
	}, [mapHook.map, mapHook.mapIsReady, props, createLayer]);

	useEffect(() => {
		if (mapHook.map?.cancelled === true || !mapHook.map?.map?.getSource?.(layerId.current)) return;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore setData only exists on GeoJsonSource
		mapHook.map.map.getSource(layerId.current)?.setData?.(props.geojson);
	}, [props.geojson, mapHook.map, props.options.type]);

	useEffect(() => {
		if (
			mapHook.map?.cancelled === true ||
			!mapHook.map ||
			!mapHook.map?.map?.getLayer?.(layerId.current) ||
			props.options.type !== layerTypeRef.current
		)
			return;

		let key;

		const layoutString = JSON.stringify(props.options.layout);
		if (props.options.layout && layoutString !== layerLayoutConfRef.current) {
			const oldLayout = JSON.parse(layerLayoutConfRef.current);

			for (key in props.options.layout) {
				if (
					props.options.layout?.[key as PaintPropsKeyType] &&
					props.options.layout[key as PaintPropsKeyType] !== oldLayout[key]
				) {
					mapHook.map.map.setLayoutProperty(
						layerId.current,
						key,
						props.options.layout[key as PaintPropsKeyType]
					);
				}
			}
			layerLayoutConfRef.current = layoutString;
		}

		const paintString = JSON.stringify(props.options.paint);
		if (paintString !== layerPaintConfRef.current) {
			const oldPaint = JSON.parse(layerPaintConfRef.current);
			for (key in props.options.paint) {
				if (
					props.options.paint?.[key as PaintPropsKeyType] &&
					props.options.paint[key as PaintPropsKeyType] !== oldPaint[key]
				) {
					mapHook.map.map.setPaintProperty(
						layerId.current,
						key,
						props.options.paint[key as PaintPropsKeyType]
					);
				}
			}
			layerPaintConfRef.current = paintString;
		}
	}, [props.options, mapHook.map]);

	useEffect(() => {
		if (
			!props.insertBeforeLayer ||
			!mapHook.map ||
			!mapHook.map.getLayer(props.insertBeforeLayer) ||
			!mapHook.map.getLayer(layerId.current)
		)
			return;

		mapHook.map.moveLayer(layerId.current, props.insertBeforeLayer);
	}, [mapHook.map, props.insertBeforeLayer]);

	useEffect(() => {
		return () => {
			mapHook.cleanup();
		};
	}, []);


	useEffect(() => {
		if (typeof props?.options?.source !== 'string' || !mapHook.map) {
			return;
		}

		const findSourceHandler = () => {
			if (
				typeof props?.options?.source === 'string' &&
				mapHook?.map?.getSource?.(props.options.source) &&
				!mapHook.map.getLayer(layerId.current)
			) {
				createLayer();
			}
		};

		mapHook.map.on('sourcedataloading', findSourceHandler);

		const addSourceHandler = (
			_ev: any,
			_wrapper: MapLibreGlWrapper,
			{ source_id }: { source_id: string }
		) => {
			if (
				mapHook.map &&
				typeof props?.options?.source === 'string' &&
				props.options.source === source_id
			) {
				createLayer();
			}
		};
		mapHook.map.wrapper.on(
			'addsource',
			addSourceHandler as unknown as MapLibreGlWrapperEventHandlerType
		);
		return () => {
			if (mapHook?.map) {
				mapHook.map.off('sourcedataloading', findSourceHandler);
				mapHook.map.wrapper.off(
					'addsource',
					addSourceHandler as unknown as MapLibreGlWrapperEventHandlerType
				);
			}
		};
	}, [mapHook.map, props.options?.source]);

	// Reload onClick-handlers when they change
	useEffect(() => {
		if(!props.onClick || !mapHook?.map || !mapHook?.map?.getLayer?.(layerId.current))return;

		const onClickHandler = props.onClick;
		mapHook.map?.on('click', layerId.current, onClickHandler);

		return () => {
			if (onClickHandler && mapHook?.map) {
				mapHook.map?.off('click', layerId.current, onClickHandler as unknown as (ev: MapMouseEvent & { features?: MapGeoJSONFeature[] | undefined; } & any) => void)
			}
		}
	}, [mapHook.map, props.onClick]);

	// Reload onHover-handlers when they change
	useEffect(() => {
		if(!props.onHover || !mapHook?.map || !mapHook?.map?.getLayer?.(layerId.current))return;

		const onHoverHandler = props.onHover;
		mapHook.map?.on('mousemove', layerId.current, onHoverHandler);

		return () => {
			if (onHoverHandler && mapHook?.map) {
				mapHook.map?.off('mousemove', layerId.current, onHoverHandler as unknown as (ev: MapMouseEvent & { features?: MapGeoJSONFeature[] | undefined; } & any) => void)
			}
		}
	}, [mapHook.map, props.onHover]);

	// Reload onLeave-handlers when they change
	useEffect(() => {
		if(!props.onLeave || !mapHook?.map || !mapHook?.map?.getLayer?.(layerId.current))return;

		const onLeaveHandler = props.onLeave;
		mapHook.map?.on('mouseleave', layerId.current, onLeaveHandler);

		return () => {
			if (onLeaveHandler && mapHook?.map) {
				mapHook.map?.off('mouseleave', layerId.current, onLeaveHandler as unknown as (ev: MapMouseEvent & { features?: MapGeoJSONFeature[] | undefined; } & any) => void)
			}
		}
	}, [mapHook.map, props.onLeave]);

	return {
		map: mapHook.map,
		layer: layer,
		layerId: layerId.current,
		componentId: mapHook.componentId,
		mapHook: mapHook,
	};
}

useLayer.defaultProps = {};

export default useLayer;
