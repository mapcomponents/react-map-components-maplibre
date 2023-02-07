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

const Template = (props: MlWmsLoaderStoryProps) => {
	const [url, setUrl] = useState(props.url || '');
	const [demoMode, setDemoMode] = useState(false);
	const [guide, setGuide] = useState(false);
	const [openWmsLoader, setOpenWmsLoader] = useState(true);

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
				pages={
					<>
						<MenuItem>
							<Typography textAlign="center" onClick={() => setOpenWmsLoader(!openWmsLoader)}>
								WMS Loader
							</Typography>
						</MenuItem>
						<MenuItem>
							<Typography
								textAlign="center"
								onClick={() => {
									setDemoMode(!demoMode);
									setOpenWmsLoader(true);
								}}
							>
								Demo WMS
							</Typography>
						</MenuItem>
					</>
				}
				buttons={
					<Button
						variant="contained"
						onClick={openGuide}
						sx={{ display: { xs: 'none', sm: 'flex' } }}
					>
						Guide me through
					</Button>
				}
			></TopToolbar>

			<Sidebar
				drawerPaperProps={{ sx: { top: '64px', maxWidth: '20%', padding: '40px' } }}
				drawerButtonStyle={{ top: '65px' }}
				sx={{ wordBreak: 'break-word' }}
				open={openWmsLoader}
				setOpen={setOpenWmsLoader}
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
