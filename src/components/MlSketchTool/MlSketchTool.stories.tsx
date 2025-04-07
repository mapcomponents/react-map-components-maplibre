import React, { useState } from 'react';

import MlSketchTool from './MlSketchTool';
import { Feature } from 'geojson';

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

	const getInstructionText = (drawMode?: keyof MapboxDraw.Modes, selectedGeoJson?: Feature) => {
		if (drawMode === 'simple_select' && selectedGeoJson) {
			const geoType = selectedGeoJson.geometry.type;
			return `Edit ${geoType}: Click the geometry to edit.`;
		}

		switch (drawMode) {
			case 'draw_point':
				return 'Click to draw point.';
			case 'draw_line_string':
				return 'Click to add vertices. Double-click to finish drawing.';
			case 'draw_polygon':
				return 'Click to add vertices. Double-click to finish drawing.';
			default:
				return 'Select a sketch tool.';
		}
	};

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
				{/* <MlSketchTool onChange={(state) => console.log(state)} /> */}
				<MlSketchTool
					onChange={(state) => {
						const { drawMode, selectedGeoJson } = state;
						setInstructionText(getInstructionText(drawMode, selectedGeoJson));
					}}
				/>
			</Sidebar>

			<Paper
				sx={{
					position: 'fixed',
					bottom: '25px',
					left: '50%',
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