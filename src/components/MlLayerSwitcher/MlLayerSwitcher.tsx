import './MlLayerSwitcher.css';
//External
import React, { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@mui/material';
//Internal
import MapContext from '../../contexts/MapContext';
import LayerBox from './components/LayerBox';
import Divider from '@mui/material/Divider';
import useMapState from '../../hooks/useMapState';

type LayerConfig = {
	layerId: string;
	src?: string;
	label: string;
	linkedTo?: string;
};

type BaseSourceConfig = {
	label?: string;
	active?: boolean;
	layers: LayerConfig[];
};

type DetailLayerConfig = {
	label?: string;
	layers: LayerConfig[];
};

export type MlLayerSwitcherProps = {
	baseSourceConfig: BaseSourceConfig;
	detailLayerConfig: DetailLayerConfig;
	mapId?: string;
};

/**
 * @component
 *
 *
 */
const MlLayerSwitcher: React.FC<MlLayerSwitcherProps> = (props) => {
	const mapContext = useContext(MapContext);
	const showBaseSources = !!props.baseSourceConfig?.layers?.length;
	const showDetailLayer = !!props.detailLayerConfig?.layers?.length;
	const { layers } = useMapState({
		mapId: props.mapId,
		watch: {
			viewport: false,
			layers: true,
			sources: false,
		},
		filter: {},
	});
	const { t } = useTranslation();

	useEffect(() => {
		//Set base state to activate only the first layer
		if (mapContext.map) {
			const disableAllButFirst = (config: LayerConfig, i: number) => {
				const layers = getLayerListFromId(config.layerId);
				const visible = i === 0 ? 'visible' : 'none';

				layers.forEach((layer) => {
					if (layer) {
						changeLayerState(layer, visible);
					}
				});
			};

			props.baseSourceConfig.layers.forEach((config, i) => disableAllButFirst(config, i));
			props.detailLayerConfig.layers.forEach((config, i) => disableAllButFirst(config, i));
		}
		return () => {
			// This is the cleanup function, it is called when this react component is removed from react-dom
			// try to remove anything this component has added to the MapLibre-gl instance
			// e.g.: remove the layer
			// mapContext.getMap(props.mapId).removeLayer(layerRef.current);
			// check for the existence of map.style before calling getLayer or getSource
		};
	}, [mapContext.map]);

	useEffect(() => {
		if (mapContext.map?.style?._layers) {
			const newactiveLayers: string[] = [];
			const newactiveDetailLayers: string[] = [];
			props.baseSourceConfig.layers.forEach((layerConfig) => {
				const layers = getLayerListFromId(layerConfig.layerId);

				layers.forEach((layer) => {
					if (!mapContext?.map) return;

					const visibilty = layer && mapContext.map?.getLayoutProperty(layer, 'visibility');
					if (mapContext.map.baseLayers.indexOf(layer) !== -1) {
						layer = 'styleBase';
					}

					if (layer && newactiveLayers.indexOf(layer) === -1 && visibilty === 'visible') {
						newactiveLayers.push(layer);
					}
				});
			});
			props.detailLayerConfig.layers.forEach(({ layerId }) => {
				const visibilty = mapContext.map?.getLayoutProperty(layerId, 'visibility');
				if (newactiveDetailLayers.indexOf(layerId) === -1 && visibilty === 'visible') {
					newactiveDetailLayers.push(layerId);
				}
			});

		}
	}, [layers]);

	const getLayerListFromId = (id: string) => {
		return id === 'styleBase' && mapContext?.map ? mapContext?.map.baseLayers : [id];
	};

	const handleDetailLayerBoxClick = (layerId: string) => {
		const cfg = props.detailLayerConfig.layers.find((e) => e.layerId === layerId);
		if (cfg?.linkedTo) {
			handleLayerBoxClick(cfg.linkedTo);
		}
		const nextVisiblityClickedLayer =
			mapContext?.map && mapContext?.map.getLayer(layerId)?.getLayoutProperty('visibility') === 'visible'
				? 'none'
				: 'visible';
		changeLayerState(layerId, nextVisiblityClickedLayer);
	};

	const handleLayerBoxClick = (id: string) => {
		const layers = getLayerListFromId(id);
		const nextVisiblityClickedLayer =
			mapContext?.map && layers?.[0] && mapContext?.map.getLayer(layers[0])?.getLayoutProperty('visibility') === 'visible'
				? 'none'
				: 'visible';

		props.baseSourceConfig.layers.forEach((config, i) => {
			const layers = getLayerListFromId(config.layerId);
			const visible:'visible' | 'none' = nextVisiblityClickedLayer === 'none' && i === 0 ? 'visible' : config.layerId === id ? nextVisiblityClickedLayer : 'none';

			layers.forEach((layer) => {
				if (layer && ['visible', 'none'].includes(visible)) {
					changeLayerState(layer, visible);
				}
			});
		});
	};

	const changeLayerState = (layer: string, visible: 'none' | 'visible' = 'none') => {
		mapContext.map?.setLayoutProperty(layer, 'visibility', visible);
	};

	return (
		<>
			{showBaseSources && (
				<Box sx={{ minHeight: '150px' }}>
					<Typography variant="h6">{t(props.baseSourceConfig.label || 'Map type')}</Typography>
					<Divider />
					<Box sx={{ display: 'flex', paddingTop: '1rem' }}>
						{props.baseSourceConfig.layers.map(({ src, label, layerId }) => {
							return (
								<LayerBox
									mapId={props.mapId}
									key={layerId}
									label={t(label)}
									layerId={layerId}
									thumbnail={src}
									handleLayerBoxClick={() => {
										handleLayerBoxClick(layerId);
									}}
								/>
							);
						})}
					</Box>
				</Box>
			)}
			{showDetailLayer && (
				<Box sx={{ minHeight: '150px' }}>
					<Typography variant="h6">{t('Map details')}</Typography>
					<Divider />
					<Box sx={{ display: 'flex', paddingTop: '1rem' }}>
						{props.detailLayerConfig.layers.map(({ src, label, layerId }) => {
							return (
								<LayerBox
									mapId={props.mapId}
									label={t(label)}
									layerId={layerId}
									key={layerId}
									thumbnail={src}
									handleLayerBoxClick={() => {
										handleDetailLayerBoxClick(layerId);
									}}
								/>
							);
						})}
					</Box>
				</Box>
			)}
		</>
	);
};

export default MlLayerSwitcher;
