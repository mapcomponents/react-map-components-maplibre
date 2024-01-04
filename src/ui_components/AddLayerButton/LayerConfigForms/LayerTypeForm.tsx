import React from 'react';

import {
	Avatar,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

export interface LayerTypeFormProps {
	onSelect: (type: string) => void;
	layerTypes: string[]
}

const LayerTypeForm = (props: LayerTypeFormProps) => {
	return (
		<>
			<DialogTitle>{props.layerTypes.length > 1 ? "Select a layer type": "Load new layer"}</DialogTitle>
			<List>
				{props.layerTypes.map((type, idx) => (
					<ListItem disableGutters key={idx}>
						<ListItemButton
							autoFocus
							onClick={() => {
								props.onSelect(type);
							}}
						>
							<ListItemAvatar>
								<Avatar>
									<DynamicFeedIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={type} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</>
	);
};

LayerTypeForm.defaultProps = {};

export default LayerTypeForm;
