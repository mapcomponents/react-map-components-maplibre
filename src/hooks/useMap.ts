import { useContext, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import MapContext, { MapContextType } from "../contexts/MapContext";
import useMapState from "./useMapState";
import MapLibreGlWrapper, { LayerState } from "../components/MapLibreMap/lib/MapLibreGlWrapper";

type useMapType = {
	map: MapLibreGlWrapper | undefined;
	mapIsReady: boolean;
	componentId: string;
	layers: (LayerState | undefined)[];
	cleanup: () => void;
};

function useMap(props?: { mapId?: string; waitForLayer?: string }): useMapType {
	const mapContext: MapContextType = useContext(MapContext);
	const [state, setState] = useState<{map:MapLibreGlWrapper | undefined, ready: boolean}>({map:undefined,ready:false});

	const mapState = useMapState({
		mapId: props?.mapId,
		watch: {
			viewport: false,
			layers: props?.waitForLayer ? true : false,
			sources: false,
		},
		filter: {
			includeBaseLayers: true,
		},
	});

	const mapRef = useRef<MapLibreGlWrapper>();

	const componentId = useRef(uuidv4());


	const cleanup = () => {
		if (mapRef.current) {
			mapRef.current.cleanup(componentId.current);
		}
	};

	useEffect(() => {
		return () => {
			cleanup();
			mapRef.current = undefined;
		};
	}, []);

	useEffect(() => {
		if(mapRef.current && mapRef.current.cancelled === true){
			mapRef.current = undefined
			setState({map:undefined, ready: false})
		}
		if (mapRef.current || !mapContext.mapExists(props?.mapId)) return;

		// check if waitForLayer (string, layer id of the layer this hook is supposed to wait for)
		// exists as layer in the MapLibre instance
		if (props?.waitForLayer) {
			let layerFound = false;

			mapState?.layers?.forEach((layer: any) => {
				if (layer.id === props?.waitForLayer) {
					layerFound = true;
				}
			});
			if (!layerFound) {
				return;
			}
		}
		mapRef.current = mapContext.getMap(props?.mapId);
		setState({map:mapRef.current, ready: true});
	}, [mapContext.mapIds, mapState.layers, mapContext, props]);

	return {
		map: state.map,
		mapIsReady: state.ready,
		componentId: componentId.current,
		layers: mapState.layers,
		cleanup,
	};
}

export default useMap;

export type { useMapType };
