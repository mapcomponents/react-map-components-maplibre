import React from 'react';
import { useEffect } from 'react';
import useMapState from './useMapState';
import useMap from './useMap';

function useLayerEvent(props) {
	const mapState = useMapState({ mapId: props.mapId, watch: { layers: true } });
	const mapHook = useMap({ mapId: props.mapId });

	useEffect(() => {
		if (!mapHook.map) return true;
		if (typeof props.condition !== 'undefined' && props.condition === false) return;
		//console.log('useLayerEvent');
		//console.log(mapState);

		if (mapHook.map.map.getLayer(props.layerId)) {
			//console.log("layer avail");
			var _event = props.event;
			var _layerId = props.layerId;
			var _eventHandler = props.eventHandler;

			//console.log(_event);
			mapHook.map.on(_event, _layerId, _eventHandler, mapHook.componentId);
			return () => {
				mapHook.map.off(_event, _layerId, _eventHandler);
			};
		}
	}, [props, mapState, mapHook.map]);

	return {};
}

export default useLayerEvent;
