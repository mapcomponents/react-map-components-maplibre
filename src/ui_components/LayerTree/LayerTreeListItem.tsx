import React from 'react';
import { ListItemText, SxProps, List } from '@mui/material';
import {
	CheckboxListItemIcon,
	CheckboxStyled,
	ListItemStyled,
} from '../LayerList/util/LayerListItemVectorLayer';
import {
	getLayerByUuid,
	LayerConfig,
	RootState,
	setLayerInMapConfig,
} from '../../stores/map.store';
import { useDispatch, useSelector } from 'react-redux';

interface LayerTreeListItemProps {
	visible: boolean;
	configurable: boolean;
	type?: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';
	name: string;
	description?: string;
	setLayerState?: (state: unknown) => void;
	showDeleteButton?: boolean;
	listItemSx?: SxProps;
	buttons?: JSX.Element;
	layerId: string;
	sortable?: boolean;
	mapConfigId: string;
}

function LayerTreeListItem(props: LayerTreeListItemProps) {
	const layer = getLayerByUuid(
		useSelector((state: RootState) => state.mapConfig),
		props.layerId
	);

	const dispatch = useDispatch();

	function handleToggleVisibility(visible: boolean) {
		const nextVisible = !visible;
		if (layer) {
			toggleVisible(layer, nextVisible);
		}
	}

	function toggleVisible(layer: LayerConfig, nextVisible: boolean): LayerConfig {
		//TODO: update layout for all layer types
		let updatedLayer = layer;
		if (layer.type === 'folder') {
			updatedLayer = {
				...layer,
				layers: layer.layers.map((subLayer) => toggleVisible(subLayer, nextVisible)),
			};
		} else {
			switch (layer?.type) {
				case 'geojson': {
					updatedLayer = {
						...layer,
						config: {
							...layer?.config,
							layout: {
								...layer?.config?.layout,
								visibility: nextVisible ? 'visible' : 'none',
							},
						},
					} as LayerConfig;
					break;
				}
				case 'vt': {
					const updatedLayers = layer.config.layers.map((layer) => ({
						...layer,
						layout: {
							...layer.layout,
							visibility: nextVisible ? 'visible' : 'none',
						},
					}));
					updatedLayer = {
						...layer,
						config: {
							...layer.config,
							layers: updatedLayers,
						},
					} as LayerConfig;
					break;
				}
			}
		}
		dispatch(
			setLayerInMapConfig({
				mapConfigUuid: props.mapConfigId,
				layer: updatedLayer,
			})
		);
		return updatedLayer;
	}

	function renderLayerItem(layer: LayerConfig): React.ReactNode {
		let visible = true;
		if (layer?.type === 'geojson') {
			visible = layer?.config?.layout?.visibility !== 'none';
		}
		if (layer?.type === 'vt') {
			visible = layer.config.layers.every((l) => l.layout?.visibility !== 'none');
		}
		if (layer?.type === 'wms') {
			//TODO: handle wms
		}
		if (layer.type === 'folder') {
			return (
				<ListItemStyled key={layer.uuid} sx={{ ...props.listItemSx, pl: 4 }}>
					<CheckboxListItemIcon>
						<CheckboxStyled checked={visible} onClick={() => handleToggleVisibility(visible)} />
					</CheckboxListItemIcon>
					<ListItemText
						primary={layer.name}
						secondary={props.description}
						primaryTypographyProps={{ overflow: 'hidden' }}
					/>
					<List>{layer.layers.map((subLayer) => renderLayerItem(subLayer))}</List>
				</ListItemStyled>
			);
		} else {
			return (
				<ListItemStyled key={layer.uuid} sx={{ ...props.listItemSx }}>
					<CheckboxListItemIcon>
						<CheckboxStyled checked={visible} onClick={() => handleToggleVisibility(visible)} />
					</CheckboxListItemIcon>
					<ListItemText
						variant="layerlist"
						primary={layer.name || ''}
						secondary={props.description}
						primaryTypographyProps={{ overflow: 'hidden' }}
					/>
					{props.buttons}
				</ListItemStyled>
			);
		}
	}

	return <>{layer && renderLayerItem(layer)}</>;
}

export default LayerTreeListItem;
