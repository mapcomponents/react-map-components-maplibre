import React, { useState} from 'react';
import MlWmsLoader from './MlWmsLoader';
import { Button, TextField, useMediaQuery } from '@mui/material';
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

const Template = (props: MlWmsLoaderStoryProps) => {
	const [url, setUrl] = useState(props.url || "");
	const [demoMode, setDemoMode] = useState(false);
	const [guide, setGuide] = useState(false);

	const mediaIsMobile = useMediaQuery('(max-width:900px)');

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
			<TopToolbar appBarStyle={{ zIndex: 1220 }}>
				<Button
					variant="contained"
					onClick={openGuide}
					sx={{ marginRight: '10px' }}
				>
					Guide me through
				</Button>
				<Button
					variant="contained"
					onClick={() => setDemoMode(!demoMode)}
					
				>
					Demo WMS
				</Button>
			</TopToolbar>

			{!mediaIsMobile || (mediaIsMobile && !demoMode) ? (
				<Sidebar
					drawerPaperProps={{ sx: { top: '65px', maxWidth: '20%', padding: '40px' } }}
					drawerButtonStyle={{ top: '65px' }}
					sx={{ wordBreak: 'break-word' }}
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
			) : (
				<></>
			)}
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
