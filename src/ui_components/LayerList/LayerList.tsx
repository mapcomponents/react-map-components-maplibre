import { List } from '@mui/material';
import React, { useEffect } from 'react';
import MlVectorTileLayer, {
	MlVectorTileLayerProps,
} from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import useLayerContext from '../../hooks/useLayerContext';
import LayerListItem from './LayerListItem';

type Props = {
	children: JSX.Element | JSX.Element[];
	style?: any;
};

const vtLayerConfig = {
	layerId: 'openmaptiles',
	sourceOptions: {
		type: 'vector' as const,
		tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf'],
	},
};
function LayerList(props: Props) {
	const layerContext = useLayerContext();

	useEffect(() => {
		if (!props.style) return;

		let backgroundLayers: any[] = [];
		let symbolLayers: any[] = [];
		props.style.layers.forEach((layer: any) => {
			if (layer.type === 'symbol') {
				symbolLayers.push(layer);
			} else {
				backgroundLayers.push(layer);
			}
		});
		layerContext.setBackgroundLayers(backgroundLayers);
		layerContext.setSymbolLayers(symbolLayers);
	}, [props.style]);

	return (
		<List sx={{ marginTop: '15px' }}>
			{layerContext?.backgroundLayers?.length > 0 && (
				<LayerListItem
					layerComponent={
						<MlVectorTileLayer {...vtLayerConfig} layers={layerContext.backgroundLayers} />
					}
					setLayerState={(state: MlVectorTileLayerProps) =>
						layerContext.setBackgroundLayers(state?.layers)
					}
					visible={true}
					configurable={true}
					type="layer"
					name="Background"
				/>
			)}
			{props.children}
			{layerContext?.symbolLayers?.length > 0 && (
				<LayerListItem
					layerComponent={
						<MlVectorTileLayer {...vtLayerConfig} layers={layerContext.symbolLayers} />
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
		</List>
	);
}

export default LayerList;
