import React from 'react';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import MlWmsLoader from '../../components/MlWmsLoader/MlWmsLoader';
import LayerListItem from './LayerListItem';
import MlOrderLayers from '../../components/MlOrderLayers/MlOrderLayers';
import { LayerConfig } from 'src/contexts/LayerContext';
import { MlGeoJsonLayerProps } from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';

export interface LayerListItemFactoryProps {
	mapId?: string;
	layers: LayerConfig[];
	setLayers?: (layers: LayerConfig[] | ((state: LayerConfig[]) => LayerConfig[])) => void;
	insertBeforeLayer?: string;
}

function LayerListItemFactory(props: LayerListItemFactoryProps) {
	return (
		<>
			<MlOrderLayers layerIds={['labels', 'content', 'background']} />
			{props.layers.map((layer: LayerConfig, idx: number) => {
				switch (layer.type) {
					case 'geojson':
						return (
							<>
								<LayerListItem
									key={idx}
									name={
										layer?.name ||
										layer?.config?.type + ' layer' ||
										'unnamed layer'
									}
									layerComponent={
										<MlGeoJsonLayer
											{...layer.config}
											mapId={props?.mapId}
											insertBeforeLayer={props?.insertBeforeLayer}
										/>
									}
									setLayerState={
										props?.setLayers
											? (layerConfig:MlGeoJsonLayerProps | false) =>
													props?.setLayers?.((current: LayerConfig[]) => {
														const _layers = [...current];
														if (layerConfig === false) {
															_layers.splice(idx, 1);
														} else {
															_layers[idx].config = layerConfig;
														}

														return _layers;
													})
											: undefined
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
									mapId={props?.mapId}
									insertBeforeLayer={props?.insertBeforeLayer}
									onConfigChange={(layerConfig) => {
										props?.setLayers?.((current: any[]) => {
											const _layers = [...current];
											if (layerConfig === false) {
												_layers.splice(idx, 1);
											} else {
												_layers[idx].config.config = layerConfig;
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
		</>
	);
}

LayerListItemFactory.defaultProps = {
	mapId: undefined,
};

export default LayerListItemFactory;
