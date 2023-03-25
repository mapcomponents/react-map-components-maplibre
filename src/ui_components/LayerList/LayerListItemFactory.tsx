import React from 'react';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import MlWmsLoader from '../../components/MlWmsLoader/MlWmsLoader';
import LayerListItem from './LayerListItem';

export interface LayerListItemFactoryProps {
	layers: any[];
}

export default function LayerListItemFactory(props: LayerListItemFactoryProps) {
	return (
		<>
			{' '}
			{props.layers.map((layer: any) => {
				switch (layer.type) {
					case 'geojson':
						return (
							<>
								<LayerListItem
									name={
										layer?.name ||
										layer?.config?.geojson?.name ||
										layer?.config?.type + ' layer' ||
										'unnamed layer'
									}
									layerComponent={<MlGeoJsonLayer {...layer.config} />}
									configurable={true}
								/>
							</>
						);
					case 'wms':
						return (
							<>
								<MlWmsLoader {...layer.config} />{' '}
							</>
						);
					default:
						return null;
				}
			})}
		</>
	);
}
