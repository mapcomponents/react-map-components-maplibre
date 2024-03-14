import React from 'react';
import { ListItemText, SxProps } from '@mui/material';
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

	let visible = true;
	if (layer?.type === 'geojson') {
		visible = layer?.config?.layout?.visibility !== 'none';
	}
	const dispatch = useDispatch();

	function toggleVisible() {
		//TODO: get rid of localvisible and just use the visibility of the layer from the store
		//TODO: update layout for all layer types
		if (layer?.type === 'geojson') {
			const nextVisible = !visible;
			const updatedLayer = {
				...layer,
				config: {
					...layer?.config,
					layout: {
						...layer?.config?.layout,
						visibility: nextVisible ? 'visible' : 'none',
					},
				},
			} as LayerConfig;
			dispatch(
				setLayerInMapConfig({
					mapConfigUuid: props.mapConfigId,
					layer: updatedLayer,
				})
			);
		}
	}

	return (
		<ListItemStyled sx={{ ...props.listItemSx }}>
			<CheckboxListItemIcon>
				<CheckboxStyled disabled={!props.visible} checked={visible} onClick={toggleVisible} />
			</CheckboxListItemIcon>
			<ListItemText
				variant="layerlist"
				primary={props.name}
				secondary={props.description}
				primaryTypographyProps={{ overflow: 'hidden' }}
			/>
		</ListItemStyled>
	);
}

export default LayerTreeListItem;
