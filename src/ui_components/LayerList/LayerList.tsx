import { List } from '@mui/material';
import React from 'react';
import MlVectorTileLayer, {
	MlVectorTileLayerProps,
} from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import useLayerContext from '../../hooks/useLayerContext';
import LayerListItem from './LayerListItem';

type Props = {
	children?: JSX.Element | JSX.Element[];
	style?: any;
};

function LayerList(props: Props) {
	const layerContext = useLayerContext();

	return (
		<List sx={{ marginTop: '15px' }}>
			{layerContext?.backgroundLayers?.length > 0 && (
				<LayerListItem
					layerComponent={
						<MlVectorTileLayer {...layerContext.vtLayerConfig} layers={layerContext.backgroundLayers} />
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
			{props?.children}
			{layerContext?.symbolLayers?.length > 0 && (
				<LayerListItem
					layerComponent={
						<MlVectorTileLayer {...layerContext.vtLayerConfig} layers={layerContext.symbolLayers} />
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
