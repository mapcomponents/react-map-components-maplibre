import React, { useState } from 'react';
import MlWmsLoader from './MlWmsLoader';
import { Button, TextField } from '@mui/material';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import MlWmsLoaderInstructions from './utils/MlWmsLoaderInstructions';

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

const Template = (props) => {
	const [url, setUrl] = useState(props.url);

	const [demoMode, setDemoMode] = useState(false);
	const [guide, setGuide] = useState(false);
	//const mapHook = useMap({ mapId: 'map_1' });

	const handleClick1 = () => {
		setDemoMode(!demoMode);
	};
	const handleClick2 = () => {
		setGuide(true);
		setTimeout(() => {
			setGuide(false);
		}, 5500);
	};

	const textColor = () => {
		if (demoMode) {
			return 'white';
		} else {
			return 'steelblue';
		}
	};

	const textColor2 = () => {
		if (guide) {
			return 'white';
		} else {
			return 'steelblue';
		}
	};

	return (
		<>
			<MlWmsLoaderInstructions open={guide}/>
			<TopToolbar >
				<Button
					variant="contained"
					onClick={handleClick2}
					color={guide ? 'primary' : 'inherit'}
					sx={{ color: textColor2 }}
				>
					{' '}
					Guide me through
				</Button>
				<Button
					variant="contained"
					onClick={handleClick1}
					color={demoMode ? 'primary' : 'inherit'}
					sx={{ color: textColor }}
				>
					Demo WMS
				</Button>
			</TopToolbar>
			<Sidebar sx={{ wordBreak: 'break-word' }}>
				<TextField
					label="WMS Url"
					variant="standard"
					value={url}
					onChange={(ev) => setUrl(ev.target.value)}
				/>
				<MlWmsLoader {...props} url={url} />
			</Sidebar>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	/**
	 * try https://maps.heigit.org/histosm/wms or https://magosm.magellium.com/geoserver/wms
	 * https://www.wms.nrw.de/wms/kitas
	 * https://www.wms.nrw.de/geobasis/wms_nw_vdop
	 */
	url: '',
};