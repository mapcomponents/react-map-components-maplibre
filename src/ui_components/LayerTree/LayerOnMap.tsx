import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LayerOrderItem, RootState } from '../../stores/map.store';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import useMap from '../../hooks/useMap';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';

interface LayerOnMapProps {
	mapConfigKey: string;
	mapId?: string;
}

function LayerOnMap(props: LayerOnMapProps) {
	const layers = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs?.[props.mapConfigKey]?.layers
	);
	const layerStoreOrder = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs?.[props.mapConfigKey]?.layerOrder
	);

	const mapHook = useMap({
		mapId: props?.mapId,
	});

	useEffect(() => {
		if (!mapHook.map || !layerStoreOrder?.length) {
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

	function renderLayer(layer: LayerOrderItem): React.ReactNode {
		const layerConfig = layers[layer.uuid];

		switch (layerConfig?.type) {
			case 'geojson':
				return (
					<MlGeoJsonLayer
						key={layerConfig.uuid}
						layerId={layerConfig.uuid}
						{...layerConfig.config}
					/>
				);
			case 'vt':
				return (
					<MlVectorTileLayer
						key={layerConfig.uuid}
						layerId={layerConfig.uuid}
						url={layerConfig.config.url}
						layers={layerConfig.config.layers}
					/>
				);
			case 'wms':
				//TODO: Handle WMS
				return <></>;
			case 'folder':
				return layer?.layers ? (
					layer.layers.map((subLayer: LayerOrderItem) => renderLayer(subLayer))
				) : (
					<></>
				);
			default:
				return null;
		}
	}

	return <>{layerStoreOrder?.map?.((layerOrderItem) => renderLayer(layerOrderItem))}</>;
}

export default LayerOnMap;
