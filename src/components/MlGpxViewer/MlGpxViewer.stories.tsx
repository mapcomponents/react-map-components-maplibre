import React, { useState } from 'react';
import MlGpxViewer from './MlGpxViewer';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlGpxViewerInstructions from './util/MlGpxViewerInstructions';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MlGpxDemoLoader from './util/MlGpxDemoLoader';
import FileCopy from '@mui/icons-material/FileCopy';
import InfoIcon from '@mui/icons-material/Info';
import Dropzone from '../../ui_components/Dropzone';
import UploadButton from '../../ui_components/UploadButton';
import MetadataDrawer from './util/MetadataDrawer';
import { MetadataType } from '../../hooks/useGpx/useGpx';

const storyoptions = {
	title: 'MapComponents/MlGpxViewer',
	component: MlGpxViewer,
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
	const [gpxData, setGpxData] = useState<string | ArrayBuffer | undefined>();
	const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [demoLoaderOpen, setDemoLoaderOpen] = useState(false);
	const [guide, setGuide] = useState(false);
	const [metadataDrawerOpen, setMetadataDrawerOpen] = useState(false);
	const [metadata, setMetadata] = useState<MetadataType[]>([]);

	const handleClick1 = () => {
		setDemoLoaderOpen(!demoLoaderOpen);
	};
	const handleClick2 = () => {
		setGuide(true);
		setTimeout(() => {
			setGuide(false);
		}, 9000);
	};

	return (
		<>
			<MlGpxViewerInstructions open={guide} />
			<MlGpxDemoLoader open={demoLoaderOpen} setOpen={setDemoLoaderOpen} setGpx={setGpxData} />
			<TopToolbar appBarStyle={{ zIndex: 500 }}>
				<Button variant="contained" onClick={handleClick2} sx={{ marginRight: '10px' }}>
					Guide me through
				</Button>
				<Button variant="contained" onClick={handleClick1}>
					Demo Mode
				</Button>
			</TopToolbar>

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
				gpxData={gpxData as string | undefined}
				onParseGpxData={(parsedGpx) => setMetadata(parsedGpx.metadata ? parsedGpx.metadata : [])}
			/>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
