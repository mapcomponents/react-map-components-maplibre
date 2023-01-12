import React, { useState, useEffect, useMemo } from 'react';

import MlTemporalController from './MlTemporalController';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import { Box, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import TopToolbar from '../../ui_components/TopToolbar';

const sampleCircle = {
	path: 'earthq_5plus.json',
	timeField: 'Year',
	type: 'circle',
	labelField: 'LocationName',
	accumulate: false,
	steps: 1,
	minVal: 1900,
};
const sampleFill = {
	path: 'african_independency.json',
	timeField: 'africa_independency_year',
	type: 'fill',
	labelField: 'africa_independency_year',
	accumulate: true,
	steps: 0.5,
	minVal: 1847,
};
const sampleLine = {
	path: 'linestring.json',
	timeField: 'time',
	type: 'line',
	labelField: 'time',
	accumulate: true,
	steps: 0.3,
	minVal: 1989,
};

const storyoptions = {
	title: 'MapComponents/MlTemporalController',
	component: MlTemporalController,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [data, setData] = useState();
	const [current, setCurrent] = useState();
	const [selected, setSelected] = useState("african_independency");


	useEffect(() => {
		fetch('assets/african_independency.json')
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				setData(json);
			});
	}, []);

	const handleChange = (e) => {
		setSelected(e.target.value);

	};

	return (
		<>
			<TopToolbar>
				<Select id="demo-select" value={selected} label="Selct demo: " onChange={handleChange}>
					<MenuItem value={'earthq_5plus'}>Ten</MenuItem>
					<MenuItem value={"african_independency"}>Twenty</MenuItem>
					<MenuItem value={"linestring"}>Thirty</MenuItem>
				</Select>
			</TopToolbar>
			
			
			{ data && (
				<MlTemporalController
					geojson={data}
					mapId={'map_1'}
					accumulate={true}
					type={'fill'}
					fitBounds={true}
					timeField={'africa_independency_year'}
					labelField={'africa_independency_year'}
					initialVal={1909}
					onStateChange={setCurrent}
					steps={5}
					showControls={true}
				/>
			)}
			
			{typeof current === 'number' && (
				<Box
					sx={{
						position: 'absolute',
						zIndex: 500,
						top: '15%',
						left: '5%',
						width: 120,
						height: 60,
						backgroundColor: 'white',
						alignContent: 'center',
					}}
				>
					<Typography variant="h3">{Math.floor(current)}</Typography>
				</Box>
			)}
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

/*

*/