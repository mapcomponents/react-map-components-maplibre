import React, { useState } from 'react';
import { ListItemText, SxProps } from '@mui/material';
import {
	CheckboxListItemIcon,
	CheckboxStyled,
	ListItemStyled,
} from './util/LayerListItemVectorLayer';

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
	layerId?: string;
	sortable?: boolean;
}

function LayerTreeListItem(props: LayerTreeListItemProps) {
	const [localVisible, setLocalVisible] = useState(true);
	return (
		<ListItemStyled sx={{ ...props.listItemSx }}>
			<CheckboxListItemIcon>
				<CheckboxStyled
					disabled={!props.visible}
					checked={localVisible}
					onClick={() => {
						setLocalVisible((val) => !val);
					}}
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
