import React, { useState } from 'react';
import MlGpxViewer from './MlGpxViewer';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlGpxViewerInstructions from './util/MlGpxViewerInstructions';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button, MenuItem, Typography } from '@mui/material';
import MlGpxDemoLoader from './util/MlGpxDemoLoader';
import Dropzone from '../../ui_components/Dropzone';
import UploadButton from '../../ui_components/UploadButton';
import Metadata from './util/Metadata';
import { MetadataType } from '../../hooks/useGpx/useGpx';
import Sidebar from '../../ui_components/Sidebar';

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

const Template = () => {
	const [gpxData, setGpxData] = useState<string | ArrayBuffer | undefined>();
	const [demoLoaderOpen, setDemoLoaderOpen] = useState(false);
	const [guide, setGuide] = useState(false);
	const [metadata, setMetadata] = useState<MetadataType[]>([]);
	const [openSidebar, setOpenSidebar] = useState(true);

	const handleClick1 = () => {
		setDemoLoaderOpen(!demoLoaderOpen);
		setOpenSidebar(true);
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
			<TopToolbar
				buttons={
					<>
						<MenuItem>
							<Typography textAlign="center" onClick={() => setOpenSidebar(!openSidebar)}>
								Informations
							</Typography>
						</MenuItem>
						<UploadButton
							setData={setGpxData}
							buttonComponent={
								<Button variant="contained" sx={{ marginRight: { xs: '0px', sm: '10px' } }}>
									Upload
								</Button>
							}
						/>
						<br />
						<br />
						<Button
							variant="contained"
							onClick={handleClick1}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Demo Mode
						</Button>
						<br />
						<br />
						<Button variant="contained" onClick={handleClick2} sx={{ display: 'none' }}>
							Guide me through
						</Button>
					</>
				}
			/>
			<Sidebar
				drawerPaperProps={{ sx: sidebarSx }}
				open={openSidebar}
				setOpen={setOpenSidebar}
				name={'GPX Informations'}
			>
				<Metadata metadata={metadata} />
			</Sidebar>
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
