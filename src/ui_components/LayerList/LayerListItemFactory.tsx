import React from 'react';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import MlWmsLoader from '../../components/MlWmsLoader/MlWmsLoader';
import LayerListItem from './LayerListItem';
import MlOrderLayers from '../../components/MlOrderLayers/MlOrderLayers';
import { LayerConfig } from 'src/contexts/LayerContext';
import { FeatureCollection } from '@turf/turf';
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
											? (layerConfig:MlGeoJsonLayerProps) =>
													props?.setLayers?.((current: LayerConfig[]) => {
														const _layers = [...current];
														current[idx].config = layerConfig;

														return _layers;
													})
											: undefined
									}
									configurable={true}
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
