import { Button, Dialog } from '@mui/material';
import React from 'react';
import { StyleSpecification } from 'maplibre-gl';

export interface SelectStylePopupProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	styles?:  StyleSpecification[];
	onSelect?: (style: StyleSpecification) => void;
}

const SelectStylePopup = (props: SelectStylePopupProps) => {
	const handleCancel = () => {
		props.setOpen(false);
	};

	return (
		<Dialog open={props.open} onClose={handleCancel} PaperProps={{ sx: { padding: '20px' } }}>
		{props?.styles?.map((style) => {
			return (<Button key={style.name} onClick={() => props?.onSelect?.(style)}>{style.name}</Button>);
		})}
		</Dialog>
	);
};

SelectStylePopup.defaultProps = {};

export default SelectStylePopup;
