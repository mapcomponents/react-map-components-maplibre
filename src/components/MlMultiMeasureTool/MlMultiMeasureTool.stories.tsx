import React, { useState } from 'react';
import * as turf from '@turf/turf';
import MlMultiMeasureTool2 from './MlMultiMeasureTool2';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../../ui_components/Sidebar';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MenuItem, Select } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlMultiMeasureTool2',
	component: MlMultiMeasureTool2,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [unit, setUnit] = useState<turf.Units>('kilometers');
	const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setUnit(event.target.value as turf.Units);
	};

	return (
		<>
			<MlMultiMeasureTool2 unit={unit} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
