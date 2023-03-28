import { Button, SxProps } from '@mui/material';
import React from 'react';
import SelectStylePopup from './SelectStylePopup';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import LayerContext from '../../contexts/LayerContext';
import {
	MonokaiStyle,
	SolarizedStyle,
	OceanicNextStyle,
	MedievalKingdomStyle,
	GruvboxStyle,
} from '../../index';

import { StyleSpecification } from 'maplibre-gl';

export interface SelectStyleButtonProps {
	sx?: SxProps;
	onComplete?: (config: any) => void;
}

const SelectStyleButton = (props: SelectStyleButtonProps) => {
	const layerContext = React.useContext(LayerContext);
	const [popupOpen, setPopupOpen] = React.useState<boolean>(false);

	return (
		<>
			<Button
				variant="contained"
				sx={{ marginTop: '10px', ...props.sx }}
				onClick={() => setPopupOpen(true)}
			>
				<WallpaperIcon />
			</Button>
			<SelectStylePopup
				styles={[
					MonokaiStyle,
					SolarizedStyle,
					OceanicNextStyle,
					MedievalKingdomStyle,
					GruvboxStyle,
				] as StyleSpecification[]}
				open={popupOpen}
				setOpen={setPopupOpen}
				onSelect={(style) => {
                    layerContext.setBackgroundLayers([]);
                    setTimeout(() => {

					layerContext.updateStyle(style);
                    }, 100)
                    setPopupOpen(false);
				}}
			/>
		</>
	);
};

SelectStyleButton.defaultProps = {};

export default SelectStyleButton;
