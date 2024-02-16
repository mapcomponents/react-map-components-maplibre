import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/map.store';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { Feature } from '@turf/turf';

interface LayerOnMapProps {
	mapConfigUuid: string;
}

function LayerOnMap(props: LayerOnMapProps) {
	const layers = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs[props.mapConfigUuid].layers
	);
	return (
		<>
			{Object.entries(layers).map(([key, layer]) => {
				if (layer.type === 'geojson') {
					return (
						<MlGeoJsonLayer key={key} geojson={layer.config.geojson as Feature}></MlGeoJsonLayer>
					);
				} else {
					//TODO: handle all other layer types
					return null;
				}
			})}
		</>
	);
}

export default LayerOnMap;
