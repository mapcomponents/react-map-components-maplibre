import React from 'react';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import MlWmsLoader from '../../components/MlWmsLoader/MlWmsLoader';
import LayerListItem from './LayerListItem';

export interface LayerListItemFactoryProps {
	mapId?: string;
	layers: any[];
	setLayers?: (layers: any[] | ((state: any[]) => any[])) => void;
}

function LayerListItemFactory(props: LayerListItemFactoryProps) {
	return (
		<>
			{' '}
			{props.layers.map((layer: any, idx: number) => {
				switch (layer.type) {
					case 'geojson':
						return (
							<>
								<LayerListItem
									key={idx}
									name={
										layer?.name ||
										layer?.config?.geojson?.name ||
										layer?.config?.type + ' layer' ||
										'unnamed layer'
									}
									layerComponent={<MlGeoJsonLayer {...layer.config} mapId={props?.mapId} />}
									setLayerState={
										props?.setLayers
											? (layerConfig) =>
													props?.setLayers?.((current: any[]) => {
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
								<MlWmsLoader {...layer.config} mapId={props?.mapId} />
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
