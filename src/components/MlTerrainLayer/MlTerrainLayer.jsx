import { useEffect } from 'react';
import { useMap } from '@mapcomponents/react-maplibre';

const MlTerrainLayer = (props) => {
	const mapHook = useMap({ mapId: 'map_1' });

	useEffect(() => {
		if (!mapHook.map) return;

		if (!mapHook.map.map.getSource('terrain')) {
			mapHook.map.map.addSource('terrain', {
				type: 'raster-dem',
				encoding: 'mapbox',
				maxzoom: 14,
				minzoom: 4,
				...props.sourceOptions,
			});
		}
		mapHook.map.map.setTerrain({
			source: 'terrain',
			exaggeration: 1,
			...props.terrainOptions,
		});

		return () => {
			mapHook.map.map.setTerrain(null);
			if (mapHook.map.map.getSource('terrain')) {
				mapHook.map.map.removeSource('terrain');
			}
		};
	}, [mapHook.map, props.sourceOptions, props.terrainOptions]);

	return <></>;
};

export default MlTerrainLayer;
