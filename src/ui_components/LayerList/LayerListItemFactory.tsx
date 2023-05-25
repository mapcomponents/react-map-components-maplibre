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
import { IconButton } from '@mui/material';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

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
			'order-background',
			...[...layerContext.layers].map((_el, idx) => 'content_order_' + idx),
			'order-labels',
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
			<MlOrderLayers layerIds={orderLayers} insertBeforeLayer='_background' />
			{layerContext?.symbolLayers?.length > 0 && (
				<LayerListItem
					key={'background_labels'}
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
			{[...layers].map((layer: LayerConfig, idx: number) => {
				if (!layer?.id) return null;

				switch (layer.type) {
					case 'geojson':
						return (
							<>
								<LayerListItem
									key={layer.id}
									name={layer?.name || layer?.config?.type + ' layer' || 'unnamed layer'}
									layerComponent={
										<MlGeoJsonLayer
											{...layer.config}
											mapId={props?.mapId}
											layerId={layer.id}
											insertBeforeLayer={'content_order_' + (layers.length - 1 - idx)}
										/>
									}
									buttons={
										<>
											<IconButton
												disabled={idx === layers.length - 1}
												onClick={() => {
													layerContext.moveDown(layer.id || '');
												}}

												sx={{
													padding: '4px',
													marginTop: '-3px',
													background: 'none',
													"&:hover": {
														background: "none"
													}
												}}
											>
												<ArrowCircleDownIcon />
											</IconButton>
											<IconButton
												disabled={idx === 0}
												onClick={() => {
													layerContext.moveUp(layer.id || '');
												}}

												sx={{
													padding: '4px',
													marginTop: '-3px',
													background: 'none',
													"&:hover": {
														background: "none"
													}
												}}
											>
												<ArrowCircleUpIcon />
											</IconButton>
										</>
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
									insertBeforeLayer={'content_order_' + (layers.length - 1 - idx)}
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
									buttons={
										<>
											<IconButton
												disabled={idx === layers.length - 1}
												onClick={() => {
													layerContext.moveDown(layer.id || '');
												}}

												sx={{
													padding: '4px',
													marginTop: '-3px',
													background: 'none',
													"&:hover": {
														background: "none"
													}
												}}
											>
												<ArrowCircleDownIcon />
											</IconButton>
											<IconButton
												disabled={idx === 0}
												onClick={() => {
													layerContext.moveUp(layer.id || '');
												}}

												sx={{
													padding: '4px',
													marginTop: '-3px',
													background: 'none',
													"&:hover": {
														background: "none"
													}
												}}
											>
												<ArrowCircleUpIcon />
											</IconButton>
										</>
									}
								/>
							</>
						);
					default:
						return null;
				}
			})}
			{layerContext?.backgroundLayers?.length > 0 && (
				<LayerListItem
					key={'background_geometry'}
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
		</>
	);
}

LayerListItemFactory.defaultProps = {
	mapId: undefined,
};

export default LayerListItemFactory;
