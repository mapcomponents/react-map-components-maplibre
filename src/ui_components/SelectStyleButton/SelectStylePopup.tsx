import {
	Avatar,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import React from 'react';
import { StyleSpecification } from 'maplibre-gl';

export interface SelectStylePopupProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	styles?: StyleSpecification[];
	onSelect?: (style: StyleSpecification) => void;
	styleThumbnailPaths?: { [key: string]: string };
}

const SelectStylePopup = (props: SelectStylePopupProps) => {
	const handleCancel = () => {
		props.setOpen(false);
	};

	return (
		<Dialog open={props.open} onClose={handleCancel} PaperProps={{ sx: { padding: '20px' } }}>
			<DialogTitle>Select a style</DialogTitle>
			<List>
				{props?.styles?.map((style) => (
					<ListItem disableGutters key={style.name}>
						<ListItemButton
							autoFocus
							onClick={() => {
								props?.onSelect?.(style);
							}}
						>
							<ListItemAvatar>
								<Avatar
									sx={{ width: '50px', height: '50px' }}
									alt={style.name}
									src={style?.name && props?.styleThumbnailPaths?.[style.name]}
								></Avatar>
							</ListItemAvatar>
							<ListItemText primary={style.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Dialog>
	);
};

SelectStylePopup.defaultProps = {
	styleThumbnailPaths: {
	},
};

export default SelectStylePopup;
