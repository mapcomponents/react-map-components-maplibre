import React, { useState } from 'react';
import MlGPXViewer from './MlGPXViewer';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlGPXViewerInstructions from './util/MlGPXViewerInstructions';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MlGPXDemoLoader from './util/MlGPXDemoLoader';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileCopy from '@mui/icons-material/FileCopy';
import InfoIcon from '@mui/icons-material/Info';
import Dropzone from '../../ui_components/Dropzone';
import UploadButton from '../../ui_components/UploadButton';
import MetadataDrawer from './util/MetadataDrawer';

const storyoptions = {
	title: 'MapComponents/MlGPXViewer',
	component: MlGPXViewer,
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
	const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [demoMode, setDemoMode] = useState(false);
	const [guide, setGuide] = useState(false);
	const [metadataDrawerOpen, setMetadataDrawerOpen] = useState(false);
	const [metadata, setMetadata] = useState([]);

	const handleClick1 = () => {
		setDemoMode(!demoMode);
	};
	const handleClick2 = () => {
		setGuide(true);
		setTimeout(() => {
			setGuide(false);
		}, 9000);
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
			<TopToolbar>
				<MlGPXViewerInstructions open={guide} />
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
					color={demoMode ? 'primary' : 'inherit'}
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
				<MlGPXDemoLoader enabled={demoMode} />

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
				<MlGPXViewer
					gpxData={gpxData}
					onParseGpxData={(parsedGpx) => setMetadata(parsedGpx.metadata ? parsedGpx.metadata : [])}
				/>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
