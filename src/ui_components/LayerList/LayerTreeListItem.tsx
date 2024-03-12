import React, { useState } from 'react';
import { ListItemText, SxProps } from '@mui/material';
import {
	CheckboxListItemIcon,
	CheckboxStyled,
	ListItemStyled,
} from './util/LayerListItemVectorLayer';
import { getLayerByUuid, RootState } from '../../stores/map.store';
import { useSelector } from 'react-redux';

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
	const layer = getLayerByUuid(useSelector((state: RootState) => state.mapConfig), props.layerId)
	function toggleVisible() {
		setLocalVisible((val) => !val);
		//TODO: set layer (un)visible
		console.log(layer)

	}
	return (
		<ListItemStyled sx={{ ...props.listItemSx }}>
			<CheckboxListItemIcon>
				<CheckboxStyled
					disabled={!props.visible}
					checked={localVisible}
					onClick={toggleVisible}
				/>
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
