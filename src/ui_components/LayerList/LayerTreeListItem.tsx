import React, { useState } from 'react';
import { ListItemText, SxProps } from '@mui/material';
import {
	CheckboxListItemIcon,
	CheckboxStyled,
	ListItemStyled,
} from './util/LayerListItemVectorLayer';
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
}

function LayerTreeListItem(props: LayerTreeListItemProps) {
	const [localVisible, setLocalVisible] = useState(true);
	const layer = getLayerByUuid(
		useSelector((state: RootState) => state.mapConfig),
		props.layerId
	);
	const dispatch = useDispatch();

	function toggleVisible() {
		const nextVisible = !localVisible;
		setLocalVisible(nextVisible);
		//TODO: get rid of localvisible and just use the visibility of the layer from the store
		//TODO: update layout for all layer types
		if (layer?.type === 'geojson') {
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
					mapConfigUuid: 'dc272150-8f04-44e2-97c5-d8f266a04cf8',
					layer: updatedLayer,
				})
			);
		}
	}

	return (
		<ListItemStyled sx={{ ...props.listItemSx }}>
			<CheckboxListItemIcon>
				<CheckboxStyled disabled={!props.visible} checked={localVisible} onClick={toggleVisible} />
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
