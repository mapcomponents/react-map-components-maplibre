import React, { useState } from 'react';

import MlSketchTool from './MlSketchTool';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button, Paper, Typography } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlSketchTool',
	component: MlSketchTool,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
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
							Sketch Tool
						</Button>
					</>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Sketch Tool'}>
				<MlSketchTool onChange={(state) => console.log(state)} />
			</Sidebar>
		</>
	);
};

const catalgoueTemplate = () => {
	// const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

	const [openSidebar, setOpenSidebar] = useState(true);
	const [instructionText, setInstructionText] = useState('Select a sketch tool.');

	const getInstructionText = (drawMode?: keyof MapboxDraw.Modes) => {
		switch (drawMode) {
			case 'draw_point':
				return 'Click to draw point.';
			case 'draw_line_string':
				return 'Click to add node. Double click to complete drawing.';
			case 'draw_polygon':
				return 'Click to add node. Double click to complete drawing.';
			default:
				return 'Select a sketch tool.';
		}
	};

	return (
		<>
			{/* <Box
				sx={{
					position: 'fixed',
					width: { xs: '100%', sm: 'auto' },
					top: { xs: '62px', sm: '22px' },
					right: { xs: '0px', sm: '180px' },
					paddingRight: { xs: '20px', sm: '0px' },
					color: '#009ee0',
					backgroundColor: '#fff',
					textAlign: 'right',
					fontSize: '16px',
					fontFamily: 'sans-serif',
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					zIndex: 5000,
				}}
			>
				{mediaIsMobile
					? 'Zum Beenden erneut auf denselben Punkt klicken.'
					: 'Die Zeichnung kann beendet werden, indem erneut auf den zuletzt gezeichneten Punkt geklickt wird.'}
			</Box> */}
			<TopToolbar
				buttons={
					<>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Sketch Tool
						</Button>
					</>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Sketch Tool'}>
				{/* <MlSketchTool onChange={(state) => console.log(state)} /> */}
				<MlSketchTool
					onChange={(state) => {
						const { drawMode } = state;
						setInstructionText(getInstructionText(drawMode));
					}}
				/>
			</Sidebar>

			<Paper
				sx={{
					position: 'fixed',
					bottom: '25px',
					left: '50%',
					// borderColor: theme.palette.mode === 'dark' ? '#313131' : '#f6f6f6',
					padding: '10px',
					zIndex: 101,
				}}
			>
				<Typography>
					{/* {mediaIsMobile
						? 'Zum Beenden erneut auf denselben Punkt klicken.'
						: 'Die Zeichnung kann beendet werden, indem erneut auf den zuletzt gezeichneten Punkt geklickt wird.'} */}
					{instructionText}
				</Typography>
			</Paper>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

export const CatalogueDemo = catalgoueTemplate.bind({});
CatalogueDemo.args = {};