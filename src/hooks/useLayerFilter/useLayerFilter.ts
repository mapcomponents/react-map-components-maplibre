import { useEffect } from 'react';
import useMap from '../useMap';
import { FilterSpecification } from 'maplibre-gl';

export interface UseLayerFilterProps {
	mapId?: string;
	layerId?: string;
	filter?: FilterSpecification;
}

function useLayerFilter(props: UseLayerFilterProps) {
	const mapHook = useMap({ mapId: props.mapId });

	useEffect(() => {
		if (!mapHook.map || !props.layerId || !props.filter) return;

		if (mapHook.map.map.getLayer(props.layerId)) {
			const _layerId = props.layerId;

			mapHook.map.map.setFilter(_layerId, props.filter);
			return () => {
				if (mapHook.map) {
					mapHook.map.map.setFilter(_layerId, null);
				}
			};
		}
		return;
	}, [props, mapHook.map]);

	return {};
}

export default useLayerFilter;
