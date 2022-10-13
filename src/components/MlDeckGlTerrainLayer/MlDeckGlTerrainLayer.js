import React, { useContext, useRef, useEffect, useState, useCallback } from 'react';
import MapContext from '../../contexts/MapContext';

import MlBasicComponent from '../MlBasicComponent';
import Button from '@mui/material/Button';

import { MapboxLayer } from '@deck.gl/mapbox';
import { TerrainLayer } from '@deck.gl/geo-layers';

/**
 * MlDeckGlTerrainLayer adds kepler.gl layer to the maplibre-gl instance.
 */
const MlDeckGlTerrainLayer = () => {
	const mapContext = useContext(MapContext);
	const [showLayer, setShowLayer] = useState(true);
	const showLayerRef = useRef(true);
	const layerName = 'deckgl-terrain-layer';

	const ELEVATION_DECODER = {
		rScaler: 6553.6,
		gScaler: 25.6,
		bScaler: 0.1,
		offset: -10000,
	};

	const TERRAIN_IMAGE = `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF4dG9iaSIsImEiOiJjaW1rcWQ5bWMwMDJvd2hrbWZ2ZTBhcnM5In0.NcGt5NmLP5Q1WC7P5u6qUA`;
	const SURFACE_IMAGE = `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWF4dG9iaSIsImEiOiJjaW1rcWQ5bWMwMDJvd2hrbWZ2ZTBhcnM5In0.NcGt5NmLP5Q1WC7P5u6qUA`;

	const cleanup = (map) => {
		if (map && map.style && map.getLayer(layerName)) {
			map.removeLayer(layerName);
		}
	};

	const mapIsReady = (map) => {
		console.log('Hallo ');
		map.addLayer(
			new MapboxLayer({
				id: layerName,
				type: TerrainLayer,
				minZoom: 0,
				maxZoom: 23,
				strategy: 'no-overlap',
				elevationDecoder: ELEVATION_DECODER,
				elevationData: TERRAIN_IMAGE,
				texture: SURFACE_IMAGE,
				wireframe: false,
				color: [255, 255, 255],
			}),
			'water-name-lakeline'
		);
		//    setTimeout(() => {
		//      map.setZoom(13);
		//      map.setPitch(45);
		//      map.setCenter({ lng: 11.647776401389137, lat: 46.48726512556033 });
		//      rotateCamera(0);
		//    }, 500);
	};

	useEffect(() => {
		if (!mapContext.map) return;

		// toggle layer visibility by changing the layout object's visibility property
		if (showLayer) {
			showLayerRef.current = true;
			mapContext.map.setLayoutProperty(layerName, 'visibility', 'visible');
		} else {
			showLayerRef.current = false;
			mapContext.map.setLayoutProperty(layerName, 'visibility', 'none');
		}
	}, [showLayer]);

	return (
		<>
			<MlBasicComponent cleanup={cleanup} mapIsReady={mapIsReady}></MlBasicComponent>
			<Button
				color="primary"
				variant={showLayer ? 'contained' : 'outlined'}
				onClick={() => setShowLayer(!showLayer)}
			>
				Terrain Layer
			</Button>
		</>
	);
};

export default MlDeckGlTerrainLayer;
