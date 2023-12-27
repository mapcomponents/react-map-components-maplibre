import React, { useState } from 'react';
import MlMultiMeasureTool from './MlMultiMeasureTool';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../../ui_components/Sidebar';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MenuItem, Select } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlMultiMeasureTool',
	component: MlMultiMeasureTool,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState('kilometers');
	const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
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
						Area: <MlMultiMeasureTool measureType={'polygon'} unit={unit} />
					</Box>
				</div>
			</Sidebar>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
