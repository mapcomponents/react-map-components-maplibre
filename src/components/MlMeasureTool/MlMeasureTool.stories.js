import React, { useState } from 'react';

import MlMeasureTool from './MlMeasureTool';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, MenuItem, Select, Switch, FormGroup, FormControlLabel } from '@mui/material';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';

const storyoptions = {
	title: 'MapComponents/MlMeasureTool',
	component: MlMeasureTool,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState('kilometers');
	const handleChange = (event) => {
		setUnit(event.target.value);
	};

	return (
		<>
			<TopToolbar
				buttons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
						sx={{ marginRight: { xs: '0px', sm: '10px' } }}
					>
						Measure Tool
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
				<div style={{ width: '200px', position: 'absolute', zIndex: 105 }}>
					<Select
						name={'units'}
						onChange={handleChange}
						label={'Unit for measurement'}
						defaultValue={'kilometers'}
					>
						<MenuItem value={'kilometers'}>Kilometers</MenuItem>
						<MenuItem value={'miles'}>Miles</MenuItem>
					</Select>
					<Grid
						container
						style={{
							textAlign: 'left',
							alignItems: 'center',
						}}
					>
						<SquareFootOutlinedIcon />
						<h4 style={{ margin: '0px' }}>Measure Polygon</h4>
					</Grid>

					<Box m={2} style={{ textAlign: 'left' }}>
						Area: <MlMeasureTool measureType={'polygon'} unit={unit} />
					</Box>
				</div>
			</Sidebar>
		</>
	);
};

const CTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState('kilometers');
	const handleChange = (event) => {
		setUnit(event.target.value);
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
				<div style={{ width: '200px', position: 'absolute', zIndex: 105 }}>
					<Select
						name={'units'}
						onChange={handleChange}
						label={'Unit for measurement'}
						defaultValue={'kilometers'}
					>
						<MenuItem value={'kilometers'}>Kilometers</MenuItem>
						<MenuItem value={'miles'}>Miles</MenuItem>
					</Select>
					<Grid
						container
						style={{
							textAlign: 'left',
							alignItems: 'center',
						}}
					>
						<SquareFootOutlinedIcon />
						<h4 style={{ margin: '0px' }}>Measure Polygon</h4>
					</Grid>

					<Box m={2} style={{ textAlign: 'left' }}>
						Area: <MlMeasureTool measureType={'polygon'} unit={unit} />
					</Box>
				</div>
			</Sidebar>
		</>
	);
};

const LineTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState('kilometers');
	const handleChange = (event) => {
		setUnit(event.target.value);
	};

	return (
		<>
			<TopToolbar
				buttons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
						sx={{ marginRight: { xs: '0px', sm: '10px' } }}
					>
						Measure Tool
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
				<div style={{ width: '200px', position: 'absolute', zIndex: 105 }}>
					<Select
						name={'units'}
						onChange={handleChange}
						label={'Unit for measurement'}
						defaultValue={'kilometers'}
					>
						<MenuItem value={'kilometers'}> Kilometers</MenuItem>
						<MenuItem value={'miles'}> Miles</MenuItem>
					</Select>
					<Grid
						container
						style={{
							textAlign: 'left',
							alignItems: 'center',
						}}
					>
						<StraightenOutlinedIcon />
						<h4 style={{ margin: '0px' }}>Measure Line</h4>
					</Grid>

					<Box m={2} style={{ textAlign: 'left' }}>
						Length: <MlMeasureTool measureType={'line'} unit={unit} />
					</Box>
				</div>
			</Sidebar>
		</>
	);
};

const CLineTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState('kilometers');
	const handleChange = (event) => {
		setUnit(event.target.value);
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
				<div style={{ width: '200px', position: 'absolute', zIndex: 105 }}>
					<Select
						name={'units'}
						onChange={handleChange}
						label={'Unit for measurement'}
						defaultValue={'kilometers'}
					>
						<MenuItem value={'kilometers'}> Kilometers</MenuItem>
						<MenuItem value={'miles'}> Miles</MenuItem>
					</Select>
					<Grid
						container
						style={{
							textAlign: 'left',
							alignItems: 'center',
						}}
					>
						<StraightenOutlinedIcon />
						<h4 style={{ margin: '0px' }}>Measure Line</h4>
					</Grid>

					<Box m={2} style={{ textAlign: 'left' }}>
						Length: <MlMeasureTool measureType={'line'} unit={unit} />
					</Box>
				</div>
			</Sidebar>
		</>
	);
};

const catalogueTemplate = () => {
	const [openSidebar2, setOpenSidebar2] = useState(true);

	const [selectedTool, setSelectedTool] = useState(null);

	const handleToolSelect = (tool) => {
		if (tool === selectedTool) {
			setSelectedTool(null);
		} else {
			setSelectedTool(tool);
		}
	};

	return (
		<>
			<TopToolbar
				buttons={
					<Button
						variant={openSidebar2 ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar2(!openSidebar2)}
						sx={{ marginRight: { xs: '0px', sm: '10px' } }}
					>
						Measuring Tools
					</Button>
				}
			/>
			<Sidebar
				open={openSidebar2}
				setOpen={setOpenSidebar2}
				name={'Measuring Tools'}
				anchor={'right'}
			>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={selectedTool === 'line_measure'}
								onChange={() => handleToolSelect('line_measure')}
							/>
						}
						label="Measure Distance"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={selectedTool === 'area_measure'}
								onChange={() => handleToolSelect('area_measure')}
							/>
						}
						label="Measure Area"
					/>
				</FormGroup>
			</Sidebar>
			{selectedTool === 'area_measure' && <CTemplate />}
			{selectedTool === 'line_measure' && <CLineTemplate />}
		</>
	);
};

export const MeasureLine = LineTemplate.bind({});
MeasureLine.parameters = {};
MeasureLine.args = {};

export const MeasurePolygon = Template.bind({});
MeasurePolygon.parameters = {};
MeasurePolygon.args = {};

export const catalogueDemo = catalogueTemplate.bind({});
catalogueDemo.parameters = {};
catalogueDemo.args = {};
