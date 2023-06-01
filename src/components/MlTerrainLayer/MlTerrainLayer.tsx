import React, { useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { TerrainSpecification } from 'maplibre-gl';

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
	 * Options for new exaggeration value
	 */
	terrainOptions?: TerrainSpecification;
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
				maxzoom: 12,
				minzoom: 4,
				...props.sourceOptions,
			});
		}
		mapHook.map.map.setTerrain({
			source: 'terrain',
			exaggeration: 1,
			...props.terrainOptions,
		});

		mapHook.map.addLayer({
			id: 'hills',
			type: 'hillshade',
			source: 'terrain',
			layout: { visibility: 'visible' },
			paint: { 'hillshade-shadow-color': 'rgba(71,59,36,0.4)' },
		});

		return () => {
			mapHook.map?.map.setTerrain(null as unknown as TerrainSpecification);
			if (mapHook.map?.map.getSource('terrain')) {
				mapHook.map.map.removeLayer('hills');
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
