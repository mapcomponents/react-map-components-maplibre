import React, { MouseEvent, useState } from 'react';
import MlMeasureTool, { MlMeasureToolProps } from './MlMeasureTool';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
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
	const [unit, setUnit] = useState<MlMeasureToolProps['unit']>('kilometers');
	const handleChange = (event: SelectChangeEvent<MlMeasureToolProps['unit']>) => {
		setUnit(event.target.value as MlMeasureToolProps['unit']);
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
					<Select
						name={'units'}
						onChange={handleChange}
						label={'Unit for measurement'}
						defaultValue={'kilometers'}
					>
						<MenuItem value={'kilometers'}>Kilometers</MenuItem>
						<MenuItem value={'miles'}>Miles</MenuItem>
					</Select>

					<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
						<StraightenOutlinedIcon sx={{ float: 'left', marginTop: '4px', marginRight: '5px' }} />
						<Typography variant="h5">Measure Polygon</Typography>
					</Box>
					<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
						Area: <MlMeasureTool measureType={'polygon'} unit={unit} />
					</Box>
			</Sidebar>
		</>
	);
};

const CTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState<MlMeasureToolProps['unit']>('kilometers');
	const handleChange = (event: SelectChangeEvent<MlMeasureToolProps['unit']>) => {
		setUnit(event.target.value as MlMeasureToolProps['unit']);
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
					<Select
						name={'units'}
						onChange={handleChange}
						label={'Unit for measurement'}
						defaultValue={'kilometers'}
					>
						<MenuItem value={'kilometers'}>Kilometers</MenuItem>
						<MenuItem value={'miles'}>Miles</MenuItem>
					</Select>

					<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
						<StraightenOutlinedIcon sx={{ float: 'left', marginTop: '4px', marginRight: '5px' }} />
						<Typography variant="h5">Measure Polygon</Typography>
					</Box>
					<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
						Area: <MlMeasureTool measureType={'polygon'} unit={unit} />
					</Box>
			</Sidebar>
		</>
	);
};

const LineTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState<MlMeasureToolProps['unit']>('kilometers');
	const handleChange = (event: SelectChangeEvent<MlMeasureToolProps['unit']>) => {
		setUnit(event.target.value as MlMeasureToolProps['unit']);
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
					<Select
						name={'units'}
						onChange={handleChange}
						label={'Unit for measurement'}
						defaultValue={'kilometers'}
					>
						<MenuItem value={'kilometers'}> Kilometers</MenuItem>
						<MenuItem value={'miles'}> Miles</MenuItem>
					</Select>

					<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
						<StraightenOutlinedIcon sx={{ float: 'left', marginTop: '4px', marginRight: '5px' }} />
						<Typography variant="h5">Measure Line</Typography>
					</Box>
					<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
						Length: <MlMeasureTool measureType={'line'} unit={unit} />
					</Box>
			</Sidebar>
		</>
	);
};

const CLineTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState<MlMeasureToolProps['unit']>('kilometers');
	const handleChange = (event: SelectChangeEvent<MlMeasureToolProps['unit']>) => {
		setUnit(event.target.value as MlMeasureToolProps['unit']);
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
					<Select
						name={'units'}
						onChange={handleChange}
						label={'Unit for measurement'}
						defaultValue={'kilometers'}
					>
						<MenuItem value={'kilometers'}> Kilometers</MenuItem>
						<MenuItem value={'miles'}> Miles</MenuItem>
					</Select>

					<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
						<StraightenOutlinedIcon sx={{ float: 'left', marginTop: '4px', marginRight: '5px' }} />
						<Typography variant="h5">Measure Line</Typography>
					</Box>
					<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
						Length: <MlMeasureTool measureType={'line'} unit={unit} />
					</Box>
			</Sidebar>
		</>
	);
};

const catalogueTemplate = () => {
	const [selectedTool, setSelectedTool] = useState<string>('area_measure');

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<any>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleToolSelect = (tool: string) => {
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

export const CatalogueDemo = catalogueTemplate.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {};
