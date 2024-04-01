import React, { useState } from 'react';
import { ListItemText, SxProps, List, styled, Box, IconButton } from '@mui/material';
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
import { LayerOrderItem } from '../../stores/map.store';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface LayerTreeListItemProps {
	visible?: boolean;
	configurable?: boolean;
	type?: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';
	name?: string;
	description?: string;
	setLayerState?: (state: unknown) => void;
	showDeleteButton?: boolean;
	listItemSx?: SxProps;
	buttons?: JSX.Element;
	sortable?: boolean;
	mapConfigKey: string;
	layerOrderConfig: LayerOrderItem;
}

const IconButtonStyled = styled(IconButton)({
	marginRight: '0px',
	padding: '0px',
});
const BoxStyled = styled(Box)<{ open: boolean }>(({ open }) => ({
	display: open ? 'block' : 'none',
}));
const ListStyled = styled(List)({
	marginLeft: '50px',
});

function LayerTreeListItem(props: LayerTreeListItemProps) {
	const layer = getLayerByUuid(
		useSelector((state: RootState) => state.mapConfig),
		props.layerOrderConfig.uuid
	);
	const [open, setOpen] = useState(false);

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
		if (layer?.type === 'folder') {
			updatedLayer = {
				...layer,
				visible: !layer.visible
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
				mapConfigKey: props.mapConfigKey,
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
				<>
					<ListItemStyled key={layer.uuid} sx={{ ...props.listItemSx, pl: 4 }}>
					<IconButtonStyled edge="end" aria-label="open" onClick={() => setOpen(!open)}>
						{open ? <ExpandMore /> : <ExpandLess />}
					</IconButtonStyled>
						<CheckboxListItemIcon>
							<CheckboxStyled checked={visible} onClick={() => handleToggleVisibility(visible)} />
						</CheckboxListItemIcon>
						<ListItemText
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden' }}
						/>
					</ListItemStyled>
					<BoxStyled key={layer.uuid + '_list'} open={open}>
						<ListStyled disablePadding>
							{props?.layerOrderConfig?.layers?.map((subLayer) => (
								<LayerTreeListItem
									layerOrderConfig={subLayer}
									key={subLayer.uuid}
									mapConfigKey={props.mapConfigKey}
								/>
							))}
						</ListStyled>
					</BoxStyled>
				</>
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
