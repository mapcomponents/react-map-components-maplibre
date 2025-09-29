import { useEffect } from 'react';
import { useState } from 'react';
import MlNavigationTools, { MlNavigationToolsProps } from './MlNavigationTools';
import noNavToolsDecorator from '../../decorators/NoNavToolsDecorator';
import BuildIcon from '@mui/icons-material/Build';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import useMap from '../../hooks/useMap';

const storyoptions = {
	title: 'MapComponents/MlNavigationTools',
	component: MlNavigationTools,

	argTypes: {
		url: {},
		layer: {},
	},
	decorators: noNavToolsDecorator,
};
export default storyoptions;

const Template: any = (props: MlNavigationToolsProps) => <MlNavigationTools {...props} />;

const catalogueTemplate: any = () => {
	const mapHook = useMap();
	const [openSidebar, setOpenSidebar] = useState(true);
	const [threeDButton, setThreeDButton] = useState(false);
	const [globeButton, setGlobeButton] = useState(false);
	const [centerLocationButton, setCenterLocationButton] = useState(false);
	const [zoomButtons, setZoomButtons] = useState(true);
	const [followGpsButton, setFollowGpsButton] = useState(false);
	const [showCustomButton, setShowCustomButton] = useState(false);
	const [alternativePosition, setAlternativePosition] = useState(false);

	const tools = [
		{ text: 'Alternative Position', const: alternativePosition, setter: setAlternativePosition },
		{ text: 'Show 2D/3D Button', const: threeDButton, setter: setThreeDButton },
		{ text: 'Show Globe Button', const: globeButton, setter: setGlobeButton },
		{
			text: 'Show CenterLocation Button',
			const: centerLocationButton,
			setter: setCenterLocationButton,
		},
		{ text: 'Show Zoom Buttons', const: zoomButtons, setter: setZoomButtons },
		{ text: 'Show FollowGPS Button', const: followGpsButton, setter: setFollowGpsButton },
		{ text: 'Add a custom Button', const: showCustomButton, setter: setShowCustomButton },
	];

	useEffect(() => {
		if (globeButton && mapHook.map) {
			mapHook.map.easeTo({ zoom: 2 });
		}
	}, [globeButton, mapHook.map]);

	return (
		<>
			<TopToolbar
				buttons={
					<>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Options
						</Button>
					</>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Navigation Tools'}>
				<FormGroup>
					{tools.map((tool, text) => (
						<FormControlLabel
							key={text}
							control={
								<Switch checked={tool.const} onChange={() => tool.setter((current) => !current)} />
							}
							label={tool.text}
						/>
					))}
				</FormGroup>
			</Sidebar>
			<MlNavigationTools
				sx={alternativePosition ? { top: '80px' } : undefined}
				show3DButton={threeDButton}
				showGlobeButton={globeButton}
				showCenterLocationButton={centerLocationButton}
				showZoomButtons={zoomButtons}
				showFollowGpsButton={followGpsButton}
			>
				{showCustomButton ? (
					<Button
						variant="navtools"
						onClick={() => {}}
						sx={{ color: (theme) => theme.palette.navigation.buttonColor }}
					>
						<BuildIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
					</Button>
				) : (
					<></>
				)}
			</MlNavigationTools>
		</>
	);
};

export const DefaultConfig = Template.bind({});
DefaultConfig.parameters = {};
DefaultConfig.args = {};

export const No3dButton = Template.bind({});
No3dButton.parameters = {};
No3dButton.args = {
	show3DButton: false,
};

export const ShowGlobeButton = Template.bind({});
ShowGlobeButton.parameters = {};
ShowGlobeButton.args = {
	showGlobeButton: true,
};

export const ShowCenterLocationButton = Template.bind({});
ShowCenterLocationButton.parameters = {};
ShowCenterLocationButton.args = {
	showFollowGpsButton: false,
	showCenterLocationButton: true,
};

export const AlternativePosition = Template.bind({});
AlternativePosition.parameters = {};
AlternativePosition.args = {
	sx: { top: '10px' },
};

export const NoZoomButtons = Template.bind({});
NoZoomButtons.parameters = {};
NoZoomButtons.args = {
	showZoomButtons: false,
};

export const NoFollowGpsButton = Template.bind({});
NoFollowGpsButton.parameters = {};
NoFollowGpsButton.args = {
	showFollowGpsButton: false,
};

export const CustomButton = Template.bind({});
CustomButton.parameters = {};
CustomButton.args = {
	children: (
		<Button
			variant="navtools"
			onClick={() => {}}
			sx={{ color: (theme) => theme.palette.navigation.buttonColor }}
		>
			<BuildIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
		</Button>
	),
};

export const CatalogueDemo = catalogueTemplate.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {};
