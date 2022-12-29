import React, { useEffect, useState } from 'react';
import { Feature, FeatureCollection } from "@turf/turf";
import MlSpatialElevationProfile from './MlSpatialElevationProfile';
import MlGpxViewer from '../MlGpxViewer/MlGpxViewer';

import InfoIcon from '@mui/icons-material/Info';
import useGpx, { MetadataType } from '../../hooks/useGpx/useGpx';
import FileCopy from '@mui/icons-material/FileCopy';
import Dropzone from '../../ui_components/Dropzone';
import UploadButton from '../../ui_components/UploadButton';
import MetadataDrawer from '../MlGpxViewer/util/MetadataDrawer';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import TopToolbar  from '../../ui_components/TopToolbar';
import useMap from '../../hooks/useMap';
import MlGpxViewerInstructions from '../MlGpxViewer/util/MlGpxViewerInstructions';
import { Button } from '@mui/material';
import MlGpxDemoLoader from '../MlGpxViewer/util/MlGpxDemoLoader';


const storyoptions= {
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
	const [gpxData, setGpxData] = useState();
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

	const textColor = () => {
		if (demoLoaderOpen) {
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

	useEffect(() => {
		if (!mapHook.map) return;
		if (mapHook.map.map.getPitch() != 60) {
			mapHook.map.map.setPitch(60);
		}
	}, [mapHook.map]);



	return (
		<> 
			<TopToolbar>
				<MlGpxViewerInstructions open={guide} />
				<Button
					variant="contained"
					onClick={handleClick2}
					color={guide ? 'primary' : 'inherit'}
					sx={{ color: textColor2, marginRight: '10px' }}
				>
					{' '}
					Guide me through
				</Button>
				<Button
					variant="contained"
					onClick={handleClick1}
					color={demoLoaderOpen ? 'primary' : 'inherit'}
					sx={{ color: textColor }}
				>
					Demo Mode
				</Button>
			</TopToolbar>
			<IconButton
				style={{
					position: 'absolute',
					right: '5px',
					bottom: mediaIsMobile ? '145px' : '130px',
					backgroundColor: 'rgba(255,255,255,1)',
					zIndex: 1000,
				}}
				title="Download sample-data"
				size="large"
				href="assets/sample.gpx"
				target="blank"
			>
				<FileDownloadIcon />
			</IconButton>
			<MlGpxDemoLoader open={demoLoaderOpen} setOpen={setDemoLoaderOpen} setGpx={setGpxData} />

			<div
				style={{
					position: 'fixed',
					right: '5px',
					bottom: mediaIsMobile ? '40px' : '25px',
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					zIndex: 1000,
				}}
			>
				<UploadButton
					setData={setGpxData}
					buttonComponent={
						<IconButton
							style={{
								backgroundColor: 'rgba(255,255,255,1)',
							}}
							size="large"
						>
							<FileCopy />
						</IconButton>
					}
				/>
				<IconButton
					onClick={() => {
						setMetadataDrawerOpen((prevState) => !prevState);
					}}
					style={{
						backgroundColor: 'rgba(255,255,255,1)',
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
