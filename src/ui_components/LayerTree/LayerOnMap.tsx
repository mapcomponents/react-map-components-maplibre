import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LayerConfig, RootState } from '../../stores/map.store';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { Feature } from '@turf/turf';
import useMap from '../../hooks/useMap';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';

interface LayerOnMapProps {
	mapConfigUuid: string;
	mapId: string;
}

function LayerOnMap(props: LayerOnMapProps) {
	const layers = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs[props.mapConfigUuid].layers
	);
	const layerStoreOrder = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs[props.mapConfigUuid].layerOrder
	);

	const mapHook = useMap({
		mapId: props.mapId,
	});

	useEffect(() => {
		if (!mapHook.map || layerStoreOrder.length < 0) {
			return;
		}
		const newOrder = [...layerStoreOrder];
		newOrder.forEach((layerId, index) => {
			const nextLayerId = index < newOrder.length - 1 ? newOrder[index + 1] : undefined;
			if (mapHook.map?.getLayer(layerId.uuid) && nextLayerId?.uuid) {
				mapHook.map.moveLayer(nextLayerId.uuid, layerId.uuid);
			}
		});
	}, [layerStoreOrder, mapHook.map]);

	function renderLayer(layer: LayerConfig): React.ReactNode {
		switch (layer.type) {
			case 'geojson':
				return (
					<MlGeoJsonLayer
						key={layer.uuid}
						layerId={layer.uuid}
						geojson={layer.config.geojson as Feature}
						layout={layer.config.layout}
					/>
				);
			case 'vt':
				return (
					<MlVectorTileLayer
						key={layer.uuid}
						layerId={layer.uuid}
						url={layer.config.url}
						layers={layer.config.layers}
					/>
				);
			case 'wms':
				//TODO: Handle WMS
				return <></>;
			case 'folder':
				return layer.layers.map((subLayer: LayerConfig) => renderLayer(subLayer));
			default:
				return null;
		}
	}

	return <>{Object.values(layers).map((layer) => renderLayer(layer))}</>;
}

export default LayerOnMap;
