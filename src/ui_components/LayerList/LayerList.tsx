import { List } from '@mui/material';
import React from 'react';
import MlVectorTileLayer, {
	MlVectorTileLayerProps,
} from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import useLayerContext from '../../hooks/useLayerContext';
import LayerListItem from './LayerListItem';

type Props = {
	mapId?: string;
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
						<MlVectorTileLayer
							{...layerContext.vtLayerConfig}
							layers={layerContext.backgroundLayers}
							mapId={props?.mapId}
							insertBeforeLayer={'order-background'}
						/>
					}
					setLayerState={(state: MlVectorTileLayerProps) => {
						console.log('setLayerState', state, state.layers[0].id);
						layerContext.setBackgroundLayers(state?.layers);
					}}
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
		</List>
	);
}

export default LayerList;
