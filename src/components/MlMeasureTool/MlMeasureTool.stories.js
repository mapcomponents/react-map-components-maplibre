import React, { useState } from 'react';
import MlMeasureTool from './MlMeasureTool';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, MenuItem, Select } from '@mui/material';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import Menu from '@mui/material/Menu';



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
	const [selectedTool, setSelectedTool] = useState('area_measure');

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleToolSelect = (tool) => {
		setSelectedTool(tool);
	};

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<>
						<Button
							id="basic-button"
							variant="contained"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							Tools
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem onClick={() => handleToolSelect('area_measure')}>Measure Area</MenuItem>
							<MenuItem onClick={() => handleToolSelect('line_measure')}>Measure Distance</MenuItem>
						</Menu>
					</>
				}
			/>
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
