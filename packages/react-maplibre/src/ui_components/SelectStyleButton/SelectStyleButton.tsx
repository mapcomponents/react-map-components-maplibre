import { Button, SxProps } from '@mui/material';
import React from 'react';
import SelectStylePopup from './SelectStylePopup';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { updateStyle } from '../../stores/map.store';
import MonokaiStyle from '../../omt_styles/monokai';
import SolarizedStyle from '../../omt_styles/solarized';
import OceanicNextStyle from '../../omt_styles/oceanic_next';
import MedievalKingdomStyle from '../../omt_styles/medieval_kingdom';
import GruvboxStyle from '../../omt_styles/gruvbox';

import { StyleSpecification } from 'maplibre-gl';

export interface SelectStyleButtonProps {
	sx?: SxProps;
	/** Store key – defaults to `'map_1'`. */
	mapId?: string;
	onComplete?: (style: StyleSpecification) => void;
	styles?: StyleSpecification[];
	defaultStyles?: boolean;
	styleThumbnailPaths?: { [key: string]: string };
}

const defaultStyleThumbnailPath =
	'https://mapcomponents.github.io/react-map-components-maplibre/react-maplibre/assets/style_thumbnails/';

const SelectStyleButton = ({
	sx,
	mapId = 'map_1',
	styles = [],
	defaultStyles = true,
	styleThumbnailPaths,
	onComplete,
}: SelectStyleButtonProps) => {
	const [popupOpen, setPopupOpen] = React.useState<boolean>(false);

	return (
		<>
			<Button
				variant="contained"
				sx={{ marginTop: '10px', ...sx }}
				onClick={() => setPopupOpen(true)}
			>
				<WallpaperIcon />
			</Button>
			<SelectStylePopup
				styles={
					[
						...(defaultStyles
							? [MonokaiStyle, SolarizedStyle, OceanicNextStyle, MedievalKingdomStyle, GruvboxStyle]
							: []),
						...(styles || []),
					] as StyleSpecification[]
				}
				styleThumbnailPaths={{
					...styleThumbnailPaths,
					...(defaultStyles
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
					updateStyle(mapId, style);
					onComplete?.(style);
					setPopupOpen(false);
				}}
			/>
		</>
	);
};

export default SelectStyleButton;
