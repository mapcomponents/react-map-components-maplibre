import React, { useState } from 'react';
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

const Template = (props) => {
	const [url, setUrl] = useState(props.url);
	const [demoMode, setDemoMode] = useState(false);
	const [guide, setGuide] = useState(false);

	const mediaIsMobile = useMediaQuery('(max-width:900px)');

	const handleClick1 = () => {
		setDemoMode(!demoMode);
	};
	const handleClick2 = () => {
		setGuide(true);
		setTimeout(() => {
			setGuide(false);
		}, 5500);
	};

	const closer = () => {
		setDemoMode(false);
	};

	const loader = (str) => {
		setUrl(str);
		setDemoMode(false);
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
			<MlWmsLoaderInstructions open={guide} />
			<WMSLinks open={demoMode} close={closer} load={loader} isMobile={mediaIsMobile}  />
			<TopToolbar>
				<Button
					variant="contained"
					onClick={handleClick2}
					color={guide ? 'primary' : 'inherit'}
					sx={{ color: textColor2 }}
				>					
					Guide me through
				</Button>
				<Button
					variant="contained"
					onClick={handleClick1}
					color={demoMode ? 'primary' : 'inherit'}
					sx={{ color: textColor}}
				>
					Demo WMS
				</Button>
			</TopToolbar>


			{(!mediaIsMobile) || (mediaIsMobile && !demoMode)? (<Sidebar sx={{ wordBreak: 'break-word' }}>
				<TextField
					label="WMS Url"
					variant="standard"
					value={url}
					onChange={(ev) => setUrl(ev.target.value)}
				/>
				<MlWmsLoader {...props} url={url} />
			</Sidebar>) : (<></>) }				
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
