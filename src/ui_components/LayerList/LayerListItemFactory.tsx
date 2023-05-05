import React, { useMemo } from 'react';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import MlWmsLoader from '../../components/MlWmsLoader/MlWmsLoader';
import LayerListItem from './LayerListItem';
import MlOrderLayers from '../../components/MlOrderLayers/MlOrderLayers';
import { LayerConfig } from 'src/contexts/LayerContext';
import { MlGeoJsonLayerProps } from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import useLayerContext from '../../hooks/useLayerContext';
import { MlWmsLoaderProps } from '../../components/MlWmsLoader/MlWmsLoader';
import MlVectorTileLayer, {
	MlVectorTileLayerProps,
} from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import { Button } from '@mui/material';

export interface LayerListItemFactoryProps {
	mapId?: string;
	layers: LayerConfig[];
	setLayers?: (layers: LayerConfig[] | ((state: LayerConfig[]) => LayerConfig[])) => void;
	insertBeforeLayer?: string;
}

function LayerListItemFactory(props: LayerListItemFactoryProps) {
	const layerContext = useLayerContext();

	const orderLayers = useMemo(() => {
		const layerIds = [
			'background',
			...layerContext.layers.map((el) => 'content_' + el.id),
			'labels',
		];

		return layerIds.reverse();
	}, [layerContext.layers]);

	const layers: LayerConfig[] = useMemo(() => {
		if (props.layers) return props.layers;
		if (layerContext?.layers) return layerContext.layers;
		return [];
	}, [props.layers, layerContext.layers]);

	const setLayers: (arg1: LayerConfig[] | ((arg: LayerConfig[]) => void)) => void = useMemo(() => {
		if (props.setLayers) return props.setLayers;
		return layerContext.setLayers;
	}, [props.setLayers, layerContext.setLayers]);

	return (
		<>
			<MlOrderLayers layerIds={orderLayers} />
			{layerContext?.backgroundLayers?.length > 0 && (
				<LayerListItem
					layerComponent={
						<MlVectorTileLayer
							{...layerContext.vtLayerConfig}
							layers={layerContext.backgroundLayers}
							mapId={props?.mapId}
							insertBeforeLayer={'order-background'}
						/>
					}
					setLayerState={(state: MlVectorTileLayerProps) => {
						layerContext.setBackgroundLayers(state?.layers);
					}}
					visible={true}
					configurable={true}
					type="layer"
					name="Background"
				/>
			)}
			{layers.map((layer: LayerConfig, idx: number) => {
				if (!layer?.id) return null;

				switch (layer.type) {
					case 'geojson':
						return (
							<>
								<LayerListItem
									key={layer.id}
									name={layer?.name || layer?.config?.type + ' layer' || 'unnamed layer'}
									additionalOptions={
										<Button
											onClick={() => {
												layerContext.moveUp(layer.id);
											}}
										>
											up
										</Button>
									}
									layerComponent={
										<MlGeoJsonLayer
											{...layer.config}
											mapId={props?.mapId}
											insertBeforeLayer={'order-content_' + layer.id}
										/>
									}
									setLayerState={(layerConfig: MlGeoJsonLayerProps | false) =>
										setLayers?.((current: LayerConfig[]) => {
											const _layers = [...current];
											if (layerConfig === false) {
												_layers.splice(idx, 1);
											} else {
												_layers[idx].config = layerConfig;
											}

											return _layers;
										})
									}
									configurable={true}
									showDeleteButton={true}
								/>
							</>
						);
					case 'wms':
						return (
							<>
								<MlWmsLoader
									{...layer.config}
									key={layer.id}
									mapId={props?.mapId}
									insertBeforeLayer={'order-content_' + layer.id}
									onConfigChange={(layerConfig) => {
										setLayers?.((current: LayerConfig[]) => {
											const _layers = [...current];
											if (layerConfig === false) {
												_layers.splice(idx, 1);
											} else {
												(_layers[idx].config as MlWmsLoaderProps).config = layerConfig;
											}
											return _layers;
										});
									}}
									featureInfoActive={layer?.config?.featureInfoActive || false}
									setFeatureInfoActive={(updateFunction) => {
										setLayers?.((current: LayerConfig[]) => {
											const _layers = [...current];
											if (typeof updateFunction === 'function') {
												(_layers[idx].config as MlWmsLoaderProps).featureInfoActive =
													updateFunction(
														(_layers[idx].config as MlWmsLoaderProps)?.featureInfoActive || false
													);
											}
											return _layers;
										});
									}}
									showDeleteButton={true}
								/>
							</>
						);
					default:
						return null;
				}
			})}
			{layerContext?.symbolLayers?.length > 0 && (
				<LayerListItem
					layerComponent={
						<MlVectorTileLayer
							{...layerContext.vtLayerConfig}
							layers={layerContext.symbolLayers}
							mapId={props?.mapId}
							insertBeforeLayer={'order-labels'}
						/>
					}
					setLayerState={(state: MlVectorTileLayerProps) =>
						layerContext.setSymbolLayers(state?.layers)
					}
					visible={true}
					configurable={true}
					type="layer"
					name="Labels"
				/>
			)}
		</>
	);
}

LayerListItemFactory.defaultProps = {
	mapId: undefined,
};

export default LayerListItemFactory;
