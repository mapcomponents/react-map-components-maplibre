import React, { useState} from 'react';
import MlWmsLoader from './MlWmsLoader';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import MlWmsLoaderInstructions from './utils/MlWmsLoaderInstructions';
import WMSLinks from './utils/WMSLinks';

const storyoptions = {
	title: 'MapComponents/MlWmsLoader',
	component: MlWmsLoader,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

interface MlWmsLoaderStoryProps {
	url: string;
}
const sidebarSx = {
	width: {
		top: '64px',
		xs: '80%',
		sm: '60%',
		md: '350px',
		lg: '350px',
	},
	boxSizing: 'border-box',
};

const Template = (props: MlWmsLoaderStoryProps) => {
	const [url, setUrl] = useState(props.url || '');
	const [demoMode, setDemoMode] = useState(false);
	const [guide, setGuide] = useState(false);
	const [openSidebar, setOpenSidebar] = useState(true);

	const openGuide = () => {
		setGuide(true);
		setTimeout(() => {
			setGuide(false);
		}, 5500);
	};

	const loader = (str: string) => {
		setUrl(str);
		setDemoMode(false);
	};

	return (
		<>
			<MlWmsLoaderInstructions open={guide} />
			<WMSLinks open={demoMode} close={() => setDemoMode(false)} load={loader} />
			<TopToolbar
				buttons={
					<>
						<MenuItem onClick={() => setOpenSidebar(!openSidebar)}>
							<Typography textAlign="center">WMS Loader</Typography>
						</MenuItem>
						<MenuItem
							onClick={() => {
								setDemoMode(!demoMode);
								setOpenSidebar(true);
							}}
						>
							<Typography textAlign="center">Demo WMS</Typography>
						</MenuItem>
						<Button variant="contained" onClick={openGuide}>
							Guide me through
						</Button>
					</>
				}
			/>

			<Sidebar
				drawerPaperProps={{ sx: sidebarSx }}
				open={openSidebar}
				setOpen={setOpenSidebar}
				name={'WMS Loader'}
			>
				<TextField
					id="wms_text_field"
					label="WMS Url"
					variant="standard"
					value={url}
					onChange={(ev) => setUrl(ev.target.value)}
				/>
				<MlWmsLoader mapId={'map_1'} url={url} />
			</Sidebar>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
