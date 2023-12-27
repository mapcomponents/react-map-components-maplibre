import React, { useState, useEffect, useRef } from 'react';
import MlWmsLoader, { WmsConfig } from './MlWmsLoader';
import { Button, FormControl, List, TextField, Theme, useMediaQuery } from '@mui/material';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import MlWmsLoaderInstructions from './utils/MlWmsLoaderInstructions';
import WMSLinks from './utils/WMSLinks';
import wmsConfig from './sample/wms_config_1.json';
import useMap from '../../hooks/useMap';

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
	const [url, setUrl] = useState(props.url || 'https://magosm.magellium.com/geoserver/wms');
	const [demoMode, setDemoMode] = useState(false);
	const [guide, setGuide] = useState(false);
	const [openSidebar, setOpenSidebar] = useState(true);
	const [featureInfoActive, setFeatureInfoActive] = useState(true);

	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
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
			<WMSLinks
				open={demoMode}
				close={() => setDemoMode(false)}
				load={loader}
				openWMSLoader={setOpenSidebar}
			/>
			<TopToolbar
				buttons={
					<>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							WMS Loader
						</Button>
						<br />
						<br />
						<Button
							variant={demoMode ? 'contained' : 'outlined'}
							onClick={() => {
								setDemoMode(!demoMode);
								setOpenSidebar(mediaIsMobile ? false : true);
							}}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Demo WMS
						</Button>
						<br />
						<br />
						<Button variant="contained" onClick={openGuide} sx={{ display: 'none' }}>
							Guide me through
						</Button>
					</>
				}
			/>

			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'WMS Loader'}>
				<FormControl fullWidth sx={{ marginTop: '10px' }}>
					<TextField
						id="wms_text_field"
						label="WMS Url"
						variant="standard"
						value={url}
						onChange={(ev) => setUrl(ev.target.value)}
						sx={{ marginBottom: '10px' }}
					/>
				</FormControl>
				<List>
					<MlWmsLoader
						mapId={'map_1'}
						url={url}
						onConfigChange={(config) => console.log(config)}
						zoomToExtent={true}
						featureInfoActive={featureInfoActive}
						setFeatureInfoActive={setFeatureInfoActive}
					/>
				</List>
			</Sidebar>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

const FixedConfigTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [config, setConfig] = useState(wmsConfig as unknown as WmsConfig);
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [0.4048, 47.3624], zoom: 5.08 });
	}, [mapHook.map]);

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
							WMS Loader
						</Button>
					</>
				}
			/>

			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'WMS fixed config'}>
				<List>
					<MlWmsLoader
						mapId={'map_1'}
						config={config as unknown as WmsConfig}
						onConfigChange={(config) => {
							console.log(config);
							setConfig(config as unknown as WmsConfig);
						}}
						zoomToExtent={true}
					/>
				</List>
			</Sidebar>
		</>
	);
};

export const ExampleFixedConfig = FixedConfigTemplate.bind({});
ExampleFixedConfig.parameters = {};
ExampleFixedConfig.args = {};
