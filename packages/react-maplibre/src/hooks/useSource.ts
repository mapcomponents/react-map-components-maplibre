import { useEffect, useRef, useCallback, useState } from 'react';
import useMap, { useMapType } from './useMap';
import MapLibreGlWrapper from '../components/MapLibreMap/lib/MapLibreGlWrapper';
import { Source, SourceSpecification } from 'maplibre-gl';

type useSourceType = {
	map: MapLibreGlWrapper | undefined;
	source: Source | undefined;
	componentId: string;
	mapHook: useMapType;
};
interface useSourceProps {
	mapId?: string;
	idPrefix?: string;
	source: SourceSpecification;
	sourceId: string;
}

function useSource(props: useSourceProps): useSourceType {
	const mapHook = useMap({
		mapId: props.mapId,
	});

	const [source, setSource] = useState<Source>();
	const sourceId = useRef(
		props.sourceId || (props.idPrefix ? props.idPrefix : 'Source-') + mapHook.componentId
	);

	const removeSource = useCallback(() => {
		if (mapHook.map && mapHook.map?.style?._layers) {
			for (const [layerId, layer] of Object.entries(mapHook.map.style._layers)) {
				if (layer.source === sourceId.current) {
					mapHook.map.removeLayer(layerId);
				}
			}

			if (mapHook.map.getSource(sourceId.current)) {
				mapHook.map.removeSource(sourceId.current);
			}
		}
	}, [mapHook.map]);

	const createSource = useCallback(() => {
		if (!mapHook.map) return;
		if (props.source.type === 'geojson' && !props.source.data) return;

		if (mapHook.map.map.getSource(sourceId.current)) {
			removeSource();
		}

		mapHook.map?.addSource(sourceId.current, {
			...props.source,
		});

		setSource(mapHook.map.map.getSource(sourceId.current));
	}, [props, mapHook, removeSource]);

	useEffect(() => {
		if (!mapHook.map?.map?.getSource(sourceId.current)) return;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore setData only exists on GeoJsonSource
		mapHook.map.map.getSource(sourceId.current)?.setData?.(props.source.data);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore data only exists on GeoJsonSource
	}, [props.source?.data]);

	useEffect(() => {
		if (mapHook?.map?.map?.getSource?.(props.sourceId) && props.sourceId === sourceId.current)
			return;

		sourceId.current = props.sourceId;
		createSource();
	}, [mapHook.map, props, createSource]);

	useEffect(() => {
		if (!mapHook.map) return;

		const checkSourceHandler = () => {
			if (!mapHook?.map?.getSource?.(props.sourceId)) {
				createSource();
			}
		};

		mapHook.map.on('styledata', checkSourceHandler);

		return () => {
			if (mapHook?.map) {
				mapHook.map.off('styledata', checkSourceHandler);
			}
		};
	}, [mapHook.map, createSource]);
	//cleanup
	useEffect(() => {
		return () => {
			removeSource();
		};
	}, [removeSource]);

	return {
		map: mapHook.map,
		source: source,
		componentId: mapHook.componentId,
		mapHook: mapHook,
	};
}

export default useSource;
