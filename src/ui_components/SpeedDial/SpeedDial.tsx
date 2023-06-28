import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { default as MuiSpeedDial, OpenReason } from '@mui/material/SpeedDial';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CloseIcon from '@mui/icons-material/Close';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import LayersIcon from '@mui/icons-material/Layers';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const actions = [
	{ icon: <PictureAsPdfIcon />, name: 'Create PDF' },
	{ icon: <DesignServicesIcon />, name: 'Sketch' },
	{ icon: <LayersIcon />, name: 'Layers' },
	{ icon: <WallpaperIcon />, name: 'Background' },
];

export interface SpeedDialProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
}

/*
 * SpeedDial Button, which opens up options for Background, Layers, Sketch and Create PDF
 */

const SpeedDial = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = (_event: React.SyntheticEvent<Event>, reason: OpenReason) => {
		if (reason === 'toggle') {
			setOpen(true);
		}
	};
	const handleClose = () => setOpen(false);

	return (
		<Box
			sx={{
				height: 330,
				transform: 'translateZ(0px)',
				flexGrow: 1,
				position: 'absolute',
				bottom: 0,
				right: 0,
				width: '100px',
				zIndex: '1000',
			}}
		>
			<MuiSpeedDial
				ariaLabel="SpeedDial tooltip example"
				sx={{ position: 'absolute', bottom: 16, right: 16 }}
				icon={open ? <CloseIcon fontSize="large" /> : <MoreVertIcon fontSize="large" />}
				onClick={open ? handleClose : (handleOpen as () => void)}
				onOpen={handleOpen}
				open={open}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						tooltipOpen
						onClick={handleClose}
						FabProps={{ sx: { color: 'text.primary' } }}
					/>
				))}
			</MuiSpeedDial>
		</Box>
	);
};

SpeedDial.defaultProps = {
	mapId: undefined,
};
export default SpeedDial;
