import { Button, SxProps } from '@mui/material';
import React from 'react';
import SelectStylePopup from './SelectStylePopup';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import LayerContext from '../../contexts/LayerContext';
import MonokaiStyle from '../../omt_styles/monokai';
import SolarizedStyle from '../../omt_styles/solarized';
import OceanicNextStyle from '../../omt_styles/oceanic_next';
import MedievalKingdomStyle from '../../omt_styles/medieval_kingdom';
import GruvboxStyle from '../../omt_styles/gruvbox';

import { StyleSpecification } from 'maplibre-gl';

export interface SelectStyleButtonProps {
	sx?: SxProps;
	onComplete?: (config: StyleSpecification[]) => void;
	styles?: StyleSpecification[];
	defaultStyles?: boolean;
	styleThumbnailPaths?: { [key: string]: string };
}

const defaultStyleThumbnailPath =
	'https://mapcomponents.github.io/react-map-components-maplibre/assets/style_thumbnails/';

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
				styles={
					[
						...(props.defaultStyles
							? [MonokaiStyle, SolarizedStyle, OceanicNextStyle, MedievalKingdomStyle, GruvboxStyle]
							: []),
						...(props.styles || []),
					] as StyleSpecification[]
				}
				styleThumbnailPaths={{
					...props?.styleThumbnailPaths,
					...(props.defaultStyles
						? {
								Monokai: defaultStyleThumbnailPath + 'monokai.png',
								Gruvbox: defaultStyleThumbnailPath + 'gruvbox.png',
								'Oceanic Next': defaultStyleThumbnailPath + 'oceanic_next.png',
								Solarized: defaultStyleThumbnailPath + 'solarized.png',
								'Medieval Kingdom': defaultStyleThumbnailPath + 'medieval_kingdom.png',
						  }
						: {}),
				}}
				open={popupOpen}
				setOpen={setPopupOpen}
				onSelect={(style) => {
					// Todo: should be possible without clearing bg layers first & setTimeout
					layerContext.setBackgroundLayers([]);
					setTimeout(() => {
						layerContext.updateStyle(style);
					}, 100);
					setPopupOpen(false);
				}}
			/>
		</>
	);
};

SelectStyleButton.defaultProps = {
	style: [],
	defaultStyles: true,
};

export default SelectStyleButton;
