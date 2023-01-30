import React, { useEffect, useState } from 'react';
import MlSpatialElevationProfile from './MlSpatialElevationProfile';
import MlGpxViewer from '../MlGpxViewer/MlGpxViewer';
import InfoIcon from '@mui/icons-material/Info';
import useGpx, { MetadataType } from '../../hooks/useGpx/useGpx';
import FileCopy from '@mui/icons-material/FileCopy';
import Dropzone from '../../ui_components/Dropzone';
import UploadButton from '../../ui_components/UploadButton';
import MetadataDrawer from '../MlGpxViewer/util/MetadataDrawer';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import TopToolbar from '../../ui_components/TopToolbar';
import useMap from '../../hooks/useMap';
import MlGpxViewerInstructions from '../MlGpxViewer/util/MlGpxViewerInstructions';
import { Button } from '@mui/material';
import MlGpxDemoLoader from '../MlGpxViewer/util/MlGpxDemoLoader';

const storyoptions = {
	title: 'MapComponents/MlSpatialElevationProfile',
	component: MlSpatialElevationProfile,
	argTypes: {
		options: {
			control: {
				type: 'object',
			},
		},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [gpxData, setGpxData] = useState<string | undefined>();
	const parsedGpx = useGpx({ data: gpxData });
	const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [demoLoaderOpen, setDemoLoaderOpen] = useState(false);
	const [guide, setGuide] = useState(false);
	const [metadataDrawerOpen, setMetadataDrawerOpen] = useState(false);
	const [metadata, setMetadata] = useState<MetadataType[]>([]);
	const mapHook = useMap({ mapId: 'map_1' });

	const handleClick1 = () => {
		setDemoLoaderOpen(!demoLoaderOpen);
	};

	const handleClick2 = () => {
		setGuide(true);
		setTimeout(() => {
			setGuide(false);
		}, 9000);
	};
	useEffect(() => {
		if (!mapHook.map) return;
		if (mapHook.map.map.getPitch() != 60) {
			mapHook.map.map.setPitch(60);
		}
	}, [mapHook.map]);

	return (
		<>
			<MlGpxViewerInstructions open={guide} />
			<TopToolbar appBarStyle={{ zIndex: 500 }}>
				<Button variant="contained" onClick={handleClick2} sx={{ marginRight: '10px' }}>
					Guide me through
				</Button>
				<Button variant="contained" onClick={handleClick1}>
					Demo Mode
				</Button>
			</TopToolbar>
			<MlGpxDemoLoader open={demoLoaderOpen} setOpen={setDemoLoaderOpen} setGpx={setGpxData} />

			<div
				style={{
					position: 'fixed',
					right: '11px',
					bottom: mediaIsMobile ? '230px' : '145px',
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					zIndex: 1000,
				}}
			>
				<UploadButton
					setData={setGpxData}
					buttonComponent={
						<IconButton size="large">
							<FileCopy />
						</IconButton>
					}
				/>
				<IconButton
					onClick={() => {
						setMetadataDrawerOpen((prevState) => !prevState);
					}}
					size="large"
				>
					<InfoIcon />
				</IconButton>
			</div>
			<MetadataDrawer metadata={metadata} open={metadataDrawerOpen} />
			<Dropzone setData={(data) => setGpxData(data)} />
			<MlGpxViewer
				gpxData={gpxData}
				onParseGpxData={(parsedGpx) => setMetadata(parsedGpx.metadata ? parsedGpx.metadata : [])}
			/>
			<MlSpatialElevationProfile geojson={parsedGpx.geojson} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
