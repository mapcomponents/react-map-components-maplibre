import React, { useEffect } from 'react';
import useMap from '../../hooks/useMap';

interface MlTerrainLayerProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Source of tiles with possibles options
	 */
	sourceOptions?: object;
	/**
	 * do we need it?
	 */
	terrainOptions?: object;
}

export type { MlTerrainLayerProps };

/**
 * Create Terrain Layer Component
 *
 */
const MlTerrainLayer = (props: MlTerrainLayerProps) => {
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
			mapHook.map?.map.setTerrain(null);
			if (mapHook.map?.map.getSource('terrain')) {
				mapHook.map.map.removeSource('terrain');
			}
		};
	}, [mapHook.map, props.sourceOptions, props.terrainOptions]);

	return <></>;
};

MlTerrainLayer.defaultProps = {
	mapId: undefined,
};
export default MlTerrainLayer;
