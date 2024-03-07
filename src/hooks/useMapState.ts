import { useContext, useCallback, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import MapContext, { MapContextType } from "../contexts/MapContext";
import MapLibreGlWrapper, {
	LayerState,
	ViewportState,
} from "../components/MapLibreMap/lib/MapLibreGlWrapper";

type useMapStateType = {
	layers: (LayerState | undefined)[];
	viewport: ViewportState | undefined;
};

/**
 * React hook that allows subscribing to map state changes
 *
 * @component
 */
function useMapState(props: {
	mapId?: string;
	watch?: {
		layers?: boolean;
		sources?: boolean;
		viewport?: boolean;
	};
	filter?: {
		includeBaseLayers?: boolean;
		matchLayerIds?: RegExp | string;
		matchSourceIds?: RegExp | string;
	};
}): useMapStateType {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	const mapContext = useContext<MapContextType>(MapContext);

	const initializedRef = useRef(false);
	const mapRef = useRef<MapLibreGlWrapper>();

	const [viewport, setViewport] = useState<ViewportState | undefined>();
	const viewportRef = useRef(undefined);

	const [layers, setLayers] = useState<(LayerState | undefined)[]>([]);
	const layersRef = useRef<string>();
	//const mapRef = useRef(props.map);
	const componentId = useRef(uuidv4());

	/**
	 * returns the element if it matches the defined filter criteria
	 * to be used as filter function on the layers array
	 *
	 * @param {object} layer
	 */
	const layerIdFilter = useCallback(
		(layer:LayerState) => {
			if (!props?.filter?.includeBaseLayers && layer?.baseLayer) {
				return false;
			}

			if (typeof props.filter?.matchLayerIds !== "undefined") {
				if (props.filter.matchLayerIds instanceof RegExp) {
					return props.filter.matchLayerIds.test(layer.id);
				} else {
					return layer.id.includes(props.filter.matchLayerIds);
				}
			}

			return true;
		},
		[props.filter]
	);

	const refreshLayerState = useCallback(() => {
		if (!mapRef.current) return;

		const _layerState = mapRef.current.wrapper.layerState.filter(layerIdFilter);
		const _layerStateString = JSON.stringify(_layerState);
		if (layersRef.current !== _layerStateString) {
			layersRef.current = _layerStateString;
			setLayers(_layerState);
		}
	}, [layerIdFilter]);

	useEffect(() => {
		const _componentId = componentId.current;

		return () => {
			// cleanup all event listeners
			if (mapRef.current) {
				mapRef.current.cleanup(_componentId);
				mapRef.current = undefined;
			}
			initializedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
		// the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
		// initialize the layer and add it to the MapLibre-gl instance or do something else with it
		initializedRef.current = true;
		mapRef.current = mapContext.getMap(props.mapId);

		if (!mapRef.current) {
			initializedRef.current = false;
			return;
		}

		if (props?.watch?.viewport) {
			setViewport(mapRef.current.wrapper.viewportState);

			// register viewportchange event handler
			mapRef.current.wrapper.on(
				"viewportchange",
				() => {
					if (viewportRef.current !== mapRef.current?.wrapper.viewportStateString) {
						setViewport(mapRef.current?.wrapper.viewportState);
					}
				},
				componentId.current
			);
		}

		// register layerchange event handler
		if (props?.watch?.layers) {
			refreshLayerState();

			mapRef.current.wrapper.on(
				"layerchange",
				refreshLayerState,
				{
					includeBaseLayers: props?.filter?.includeBaseLayers,
					matchLayerIds: props?.filter?.matchLayerIds,
				},
				componentId.current
			);
		}
	}, [mapContext.mapIds, mapContext, props.mapId, refreshLayerState, props]);

	return {
		layers,
		viewport,
	};
}

useMapState.defaultProps = {
	mapId: undefined,
	watch: {
		layers: true,
		sources: false,
		viewport: false,
	},
	filter: {
		includeBaseLayers: false,
	},
};

export default useMapState;
