import React, { useState, useEffect } from 'react';
import MlMeasureTool, { MlMeasureToolOnChangeOptions, MlMeasureToolProps } from './MlMeasureTool';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import {
	useTheme,
	Button,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	Checkbox,
	InputLabel,
	OutlinedInput,
	Box,
	Paper,
} from '@mui/material';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import { LineString } from 'geojson';

const storyoptions = {
	title: 'MapComponents/MlMeasureTool',
	component: MlMeasureTool,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState<MlMeasureToolProps['unit']>('meters');
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
					<SquareFootOutlinedIcon sx={{ float: 'left', marginTop: '4px', marginRight: '5px' }} />
					<Typography variant="h5">Measure Polygon</Typography>
				</Box>
				<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
					Area: <MlMeasureTool measureType={'polygon'} unit={unit} />
				</Box>
			</Sidebar>
		</>
	);
};

interface CatalogueSidebarProps {
	openSidebar: boolean;
	setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const CatalogueSidebar: React.FC<CatalogueSidebarProps> = ({ openSidebar, setOpenSidebar }) => {
	const theme = useTheme();

	const [measureType, setMeasureType] = useState('measure-distance');
	const [unit, setUnit] = useState<MlMeasureToolProps['unit']>('meters');
	const [resetKey, setResetKey] = useState(0);
	const [showInstruction, setShowInstruction] = useState(true);
	const [isMeasuring, setIsMeasuring] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [isSecondAreaClick, setIsSecondAreaClick] = useState(false);

	const units = [
		'meters',
		'millimeters',
		'centimeters',
		'kilometers',
		'acres',
		'miles',
		'nauticalmiles',
		'inches',
		'yards',
		'feet',
		'hectares',
	];

	const handleMeasureTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newMeasureType = event.target.value;
		setMeasureType(newMeasureType);

		if (newMeasureType === 'measure-distance' && (unit === 'acres' || unit === 'hectares')) {
			setUnit('meters');
		}

		setIsMeasuring(false);
		setIsFinished(false);
	};

	const handleUnitChange = (event: SelectChangeEvent<MlMeasureToolProps['unit']>) => {
		setUnit(event.target.value as MlMeasureToolProps['unit']);
	};

	const handleRestartButton = () => {
		setResetKey((prevKey) => prevKey + 1);
		setIsMeasuring(false);
		setIsFinished(false);
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShowInstruction(event.target.checked);
	};

	// Reset to default values when sidebar is closed and opened again
	useEffect(() => {
		if (openSidebar) {
			setShowInstruction(true);
			setIsMeasuring(false);
			setIsFinished(false);
		}

		setMeasureType(openSidebar ? 'measure-distance' : 'measure-distance');
		setUnit(openSidebar ? 'meters' : 'meters');

		if (openSidebar) {
			setResetKey((prevKey) => prevKey + 1);
		} else {
			setResetKey(0);
		}
	}, [openSidebar]);

	const handleMeasureStart = (state: MlMeasureToolOnChangeOptions) => {
		setIsMeasuring(true);
		if (
			(state.geojson.geometry as LineString).coordinates[0].length == 2 &&
			measureType == 'measure-area'
		) {
			setIsSecondAreaClick(true);
		} else {
			setIsSecondAreaClick(false);
		}
	};

	const handleMeasureFinish = () => {
		setIsMeasuring(false);
		setIsFinished(true);
	};

	const getInstructionText = () => {
		if (isMeasuring) {
			return isSecondAreaClick
				? 'Click to add node.'
				: 'Click to add node. Double click to complete drawing.';
		}
		return 'Click on the map to start.';
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
				<Box style={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
					<FormControl>
						<RadioGroup
							name="measure-type-select"
							value={measureType}
							onChange={handleMeasureTypeChange}
						>
							<FormControlLabel
								value="measure-distance"
								control={<Radio />}
								label="Measure distance"
							/>
							<FormControlLabel value="measure-area" control={<Radio />} label="Measure area" />
						</RadioGroup>
						<FormControlLabel
							control={<Checkbox checked={showInstruction} onChange={handleCheckboxChange} />}
							label="Show instructions"
						/>
					</FormControl>
				</Box>

				<Box sx={{ fontFamily: 'sans-serif', marginTop: '20px' }}>
					<FormControl sx={{ m: 1, width: 300 }}>
						<InputLabel>Unit</InputLabel>
						<Select
							value={unit}
							onChange={handleUnitChange}
							input={<OutlinedInput label="Unit" />}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 48 * 4.5 + 8,
										width: 250,
									},
								},
							}}
						>
							{units.map((unit) => (
								<MenuItem
									key={unit}
									value={unit}
									disabled={
										(unit === 'hectares' || unit === 'acres') && measureType === 'measure-distance'
									}
								>
									{unit}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<Box
					style={{ fontFamily: 'sans-serif', marginTop: '20px' }}
					sx={{
						height: 120,
						bgcolor: theme.palette.mode === 'dark' ? '#444246' : '#f6f6f6',
						padding: '10px',
					}}
				>
					<Typography>
						<b>{measureType === 'measure-distance' ? 'Distance' : 'Area'}</b>
					</Typography>
					<Typography variant="h6">
						<MlMeasureTool
							key={`${measureType}-${resetKey}`}
							measureType={measureType === 'measure-distance' ? 'line' : 'polygon'}
							unit={unit}
							onFinish={handleMeasureFinish}
							onChange={handleMeasureStart}
						/>
					</Typography>
				</Box>

				{isFinished && (
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
						<Button size="small" variant="contained" onClick={handleRestartButton}>
							Restart
						</Button>
					</Box>
				)}
			</Sidebar>

			{openSidebar && showInstruction && !isFinished && (
				<Paper
					sx={{
						position: 'fixed',
						top: '110px',
						right: '20px',
						backgroundColor: '#f6f6f6',
						border: '2px solid #000000',
						padding: '10px',
						zIndex: 101,
						elevation: 3,
					}}
				>
					<Typography variant="body1" align="center">
						{getInstructionText()}
					</Typography>
				</Paper>
			)}
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

const catalogueTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);

	return (
		<>
			{/* <Box
				sx={{
					mousePosition: 'fixed',
					width: { xs: '100%', sm: 'auto' },
					top: { xs: '62px', sm: '22px' },
					right: { xs: '0px', sm: '120px', md: '145px', lg: '155px', xl: '175px' },
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
			></Box> */}
			<TopToolbar
				unmovableButtons={
					<>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
						>
							Measure Tool
						</Button>
					</>
				}
			/>
			<CatalogueSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
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
