import React from 'react';

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
}

const LayerContext = React.createContext({} as LayerContextType);

function LayerContextProvider(props: LayerContextProps) {
	const [layers, setLayers] = React.useState<any[]>([]);

	const value = {
		layers,
		setLayers,
	} as LayerContextType;

	return <LayerContext.Provider value={value}>{props.children}</LayerContext.Provider>;
}

export default LayerContext;
export { LayerContextProvider };
