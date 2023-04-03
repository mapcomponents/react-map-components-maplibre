import { Button, SxProps } from '@mui/material';
import React from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddLayerPopup from './AddLayerPopup';
import { LayerConfig } from '../../contexts/LayerContext';

export interface AddLayerButtonProps {
	sx?: SxProps;
	onComplete?: (config: LayerConfig) => void;
}

const AddLayerButton = (props: AddLayerButtonProps) => {
	const [popupOpen, setPopupOpen] = React.useState<boolean>(false);

	return (
		<>
			<Button
				variant="contained"
				sx={{ marginTop: '10px', ...props.sx }}
				onClick={() => setPopupOpen(true)}
			>
				<PlaylistAddIcon />
			</Button>
			<AddLayerPopup open={popupOpen} setOpen={setPopupOpen} onComplete={props?.onComplete} />
		</>
	);
};

AddLayerButton.defaultProps = {};

export default AddLayerButton;
