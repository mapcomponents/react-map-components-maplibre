import React from 'react';
import { MlVectorTileLayerProps } from 'src/components/MlVectorTileLayer/MlVectorTileLayer';

export interface LayerContextProps {
	children: React.ReactNode;
}

export interface LayerConfig {
	type: 'wms' | 'geojson' | 'vt';
	config: any;
}

export interface LayerContextType {
	layers: LayerConfig[];
	setLayers: (layers: LayerConfig[] | ((layers: LayerConfig[]) => LayerConfig[])) => void;
	backgroundLayers: MlVectorTileLayerProps['layers'];
	setBackgroundLayers: (
		layers:
			| MlVectorTileLayerProps['layers']
			| ((layers: MlVectorTileLayerProps['layers']) => MlVectorTileLayerProps['layers'])
	) => void;
	symbolLayers: MlVectorTileLayerProps['layers'];
	setSymbolLayers: (
		layers:
			| MlVectorTileLayerProps['layers']
			| ((layers: MlVectorTileLayerProps['layers']) => MlVectorTileLayerProps['layers'])
	) => void;
}

const LayerContext = React.createContext({} as LayerContextType);

function LayerContextProvider(props: LayerContextProps) {
	const [layers, setLayers] = React.useState<any[]>([]);
	const [backgroundLayers, setBackgroundLayers] = React.useState<any[]>([]);
	const [symbolLayers, setSymbolLayers] = React.useState<any[]>([]);

	const value = {
		layers,
		setLayers,
		backgroundLayers,
		setBackgroundLayers,
		symbolLayers,
		setSymbolLayers,
	} as LayerContextType;

	return <LayerContext.Provider value={value}>{props.children}</LayerContext.Provider>;
}

export default LayerContext;
export { LayerContextProvider };
