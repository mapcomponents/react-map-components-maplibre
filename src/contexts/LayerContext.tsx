import { LayerSpecification, StyleSpecification } from 'maplibre-gl';
import React, { useEffect, useMemo, useCallback } from 'react';
import { MlVectorTileLayerProps } from '../components/MlVectorTileLayer/MlVectorTileLayer';
import config from '../omt_styles/config';
import { MlGeoJsonLayerProps } from '../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { v4 as uuidv4 } from 'uuid';
import { Layer } from 'wms-capabilities';

export interface LayerContextProps {
	children: 
	React.ReactNode;
}

export interface wmsLoaderConfigProps{
	getFeatureInfoUrl: string,
layers: Layer[] , 
name: string,
open: boolean,
visible: boolean ,
wmsUrl: string
}
export interface wmsConfig{
featureInfoActive?: boolean;
config?: wmsLoaderConfigProps,
url: string
}

export type WmsLayerConfig = {
	type: 'wms';
	name?: string;
	id?: string;
	config: wmsConfig;
};
export type GeojsonLayerConfig = {
	type: 'geojson';
	name?: string;
	id?: string;
	config: MlGeoJsonLayerProps;
};
export type VtLayerConfig = {
	type: 'vt';
	name?: string;
	id?: string;
	config: MlVectorTileLayerProps;
};

export type LayerConfig = WmsLayerConfig | GeojsonLayerConfig | VtLayerConfig;

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
	moveUp: (layerId: string) => void;
	moveDown: (layerId: string) => void;
	moveLayer: (layerId: string,  getNewPos: (oldPos: number) => number) => void;
}

const LayerContext = React.createContext({} as LayerContextType);

function LayerContextProvider(props: LayerContextProps) {
	const [layers, setLayers] = React.useState<LayerConfig[]>([]);
	const [backgroundLayers, setBackgroundLayers] = React.useState<LayerSpecification[]>([]);
	const [symbolLayers, setSymbolLayers] = React.useState<LayerSpecification[]>([]);
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

	useEffect(() => {
		if (layers.filter((el) => !el?.id).length) {
			const _layers = [...layers];
			_layers.forEach((el) => {
				if (!el?.id) {
					el.id = uuidv4();
				}
			});
			setLayers(_layers);
		}
	}, [layers]);

	const moveLayer = useCallback(
		(layerId: string, getNewPos: (oldPos: number) => number) => {
			const targetLayer = layers?.filter?.((el) => el.id === layerId);

			if (targetLayer.length > 0) {
				const newLayers = [...layers];
				const element = targetLayer[0];
				const idx = layers.indexOf(element);
				const newPos = getNewPos(idx);
				if (newPos >= 0 && newPos <= layers.length - 1) {
					newLayers.splice(idx, 1);
					newLayers.splice(newPos, 0, element);
					setLayers(newLayers);
				}
			}
		},
		[layers]
	);

	const moveDown = useCallback(
		(layerId: string) => {
			moveLayer(layerId, (idx) => idx + 1);
		},
		[moveLayer]
	);

	const moveUp = useCallback(
		(layerId: string) => {
			moveLayer(layerId, (idx) => idx - 1);
		},
		[moveLayer]
	);

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
		moveUp,
		moveDown,
		moveLayer,
	} as LayerContextType;

	return <LayerContext.Provider value={value}>{props.children}</LayerContext.Provider>;
}

export default LayerContext;
export { LayerContextProvider };
