import React from 'react';
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

const Template = (props: MlNavigationToolsProps ) => <MlNavigationTools {...props} />;

const catalogueTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [ThreeDButton, setThreeDButton] = useState(false);
	const [CenterLocationButton, setCenterLocationButton] = useState(false);
	const [ZoomButtons, setZoomButtons] = useState(true);
	const [FollowGpsButton, setFollowGpsButton] = useState(false);
	const [showCustomButton, setShowCustomButton] = useState<boolean>(false);
	const [alternativePosition, setAlternativePosition] = useState(false);

	const handleChange1 = () => {
		setThreeDButton(!ThreeDButton);
	};
	const handleChange2 = () => {
		setCenterLocationButton(!CenterLocationButton);
	};
	const handleChange3 = () => {
		setZoomButtons(!ZoomButtons);
	};
	const handleChange4 = () => {
		setFollowGpsButton(!FollowGpsButton);
	};

	const handleCustomButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShowCustomButton(event.target.checked);
	};

	const handleAlternativePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAlternativePosition(event.target.checked);
	};

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
					<FormControlLabel
						control={
							<Switch checked={alternativePosition} onChange={handleAlternativePositionChange} />
						}
						label="Alternative Position"
					/>
					<FormControlLabel
						control={<Switch checked={ThreeDButton} onChange={handleChange1} />}
						label="Show 3D button"
					/>
					<FormControlLabel
						control={<Switch checked={CenterLocationButton} onChange={handleChange2} />}
						label="Show center location button"
					/>
					<FormControlLabel
						control={<Switch checked={ZoomButtons} onChange={handleChange3} />}
						label="Show zoom buttons"
					/>
					<FormControlLabel
						control={<Switch checked={FollowGpsButton} onChange={handleChange4} />}
						label="Show 'FollowGPS' Button"
					/>
					<FormControlLabel
						control={<Switch checked={showCustomButton} onChange={handleCustomButtonChange} />}
						label="Add a custom Button"
					/>
				</FormGroup>
			</Sidebar>
			<MlNavigationTools
				sx={alternativePosition ? { top: '80px' } : undefined}
				show3DButton={ThreeDButton}
				showCenterLocationButton={CenterLocationButton}
				showZoomButtons={ZoomButtons}
				showFollowGpsButton={FollowGpsButton}
			>
				{showCustomButton ? (
					<Button variant="navtools" onClick={() => {}}>
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
		<Button variant="navtools" onClick={() => {}}>
			<BuildIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
		</Button>
	),
};

export const CatalogueDemo =  catalogueTemplate.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {};
