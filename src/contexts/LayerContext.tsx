import { LayerSpecification, StyleSpecification } from 'maplibre-gl';
import React, { useMemo } from 'react';
import MlOrderLayers from '../components/MlOrderLayers/MlOrderLayers';
import { MlVectorTileLayerProps } from '../components/MlVectorTileLayer/MlVectorTileLayer';
import config from '../omt_styles/config';

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
	updateStyle: (style: StyleSpecification) => void;
	vtLayerConfig: Partial<MlVectorTileLayerProps>;
	setTileUrl: (url: string) => void;
	tileUrl: string;
}

const LayerContext = React.createContext({} as LayerContextType);

function LayerContextProvider(props: LayerContextProps) {
	const [layers, setLayers] = React.useState<any[]>([]);
	const [backgroundLayers, setBackgroundLayers] = React.useState<any[]>([]);
	const [symbolLayers, setSymbolLayers] = React.useState<any[]>([]);
	const [tileUrl, setTileUrl] = React.useState<string>(config.sourceOptions_tiles[0]);

	const vtLayerConfig = useMemo<Partial<MlVectorTileLayerProps>>(
		() => ({
			layerId: 'openmaptiles',
			sourceOptions: {
				type: 'vector' as const,
				tiles: [tileUrl],
			},
		}),
		[tileUrl]
	);

	const updateStyle = (style: StyleSpecification) => {
		if (!style) return;

		const backgroundLayers: LayerSpecification[] = [];
		const symbolLayers: LayerSpecification[] = [];
		style.layers.forEach((layer: LayerSpecification, idx: number) => {
			if (layer.type === 'symbol') {
				symbolLayers.push(layer);
			} else {
				if (idx === 0) layer.id = style.name || 'background';
				backgroundLayers.push(layer);
			}
		});
		setBackgroundLayers(backgroundLayers);
		setSymbolLayers(symbolLayers);
	};

	const value = {
		layers,
		setLayers,
		backgroundLayers,
		setBackgroundLayers,
		symbolLayers,
		setSymbolLayers,
		updateStyle,
		vtLayerConfig,
		tileUrl,
		setTileUrl,
	} as LayerContextType;

	return (
		<LayerContext.Provider value={value}>
			<MlOrderLayers layerIds={['labels', 'content', 'background']} />
			{props.children}
		</LayerContext.Provider>
	);
}

export default LayerContext;
export { LayerContextProvider };
