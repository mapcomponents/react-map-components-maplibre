import React, { useState } from 'react';
import MlTemporalController, { MlTemporalControllerProps } from './MlTemporalController';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import { Box, Typography } from '@mui/material';
import TopToolbar from '../../ui_components/TopToolbar';
import african_independency from './assets/african_independency.json';
import earthq_5plus from './assets/earthq_5plus.json';
import jakobsweg from './assets/jakobsweg.json';


interface TimeDisplayProps {
value: number | undefined
}
const storyoptions = {
	title: 'MapComponents/MlTemporalController',
	component: MlTemporalController,
	argTypes: {},
	decorators: mapContextDecorator,
	parameters: {
    sourceLink: 'components/MlTemporalController/MlTemporalController.tsx'
	}
};
export default storyoptions;



const TimeDisplay = (props: TimeDisplayProps) => {
	if (typeof props.value === 'number') {
		return (
			<>
				<Box
					sx={{
						position: 'absolute',
						zIndex: 500,
						top: '20%',
						width: '120px',
						height: '60px',
						backgroundColor: 'white',
						alignContent: 'center',
					}}
				>
					<Typography variant="h3">{Math.floor(props.value)}</Typography>
				</Box>
			</>
		);
	} else {
		return <></>;
	}
};

const FillTemplate = (props: MlTemporalControllerProps) => {
	const [current, setCurrent] = useState<number>();

	return (
		<>
		<TopToolbar>
				<Typography variant="h6" color={'ButtonText'}>
				African countries by independecy year.
			</Typography>
			</TopToolbar>
			<MlTemporalController {...props} onStateChange={setCurrent} />
			<TimeDisplay value={current} />
		</>
	);
};

const CircleTemplate = (props: MlTemporalControllerProps) => {
	const [current, setCurrent] = useState();

	return (
		<>
			<TopToolbar>
				<Typography variant="h6" color={'ButtonText'}>
				Earthquakes with 5 or more magnitude in the mediterranean area.
			</Typography>
			</TopToolbar>
			
			<MlTemporalController {...props} onStateChange={setCurrent} />
			<TimeDisplay value={current} />
		</>
	);
};

const LineTemplate = (props: MlTemporalControllerProps) => {
	const [current, setCurrent] = useState();

	return (
		<>
		<TopToolbar>
				<Typography variant="h6" color={'ButtonText'}>
				The French Way of Saint James by stage number.
			</Typography>
			</TopToolbar>
			<MlTemporalController {...props} onStateChange={setCurrent} />
			<TimeDisplay value={current} />
		</>
	);
};

export const FillConfig = FillTemplate.bind({});
FillConfig.parameters = {};
FillConfig.args = {
	geojson: african_independency,

	path: 'african_independency.json',
	timeField: 'africa_independency_year',
	type: 'fill',
	labelField: 'africa_independency_year',
	accumulate: true,
	steps: 1,
	initialVal: 1904,
	fitBounds: true,
	showControls: true,
};

export const CircleConfig = CircleTemplate.bind({});
CircleConfig.parameters = {};
CircleConfig.args = {
	geojson: earthq_5plus,
	mapId: 'map_1',
	timeField: 'Year',
	type: 'circle',
	labelField: 'LocationName',
	accumulate: false,
	steps: 1,
	minVal: 1900,
	fitBounds: true,
	showControls: true,
};

export const LineConfig = LineTemplate.bind({});
LineConfig.parameters = {};
LineConfig.args = {
	geojson: jakobsweg,
	mapId: 'map_1',
	timeField: 'stage',
	type: 'line',
	labelField: 'name',
	accumulate: true,	
	steps: 1,
	featuresColor: '#1731F1',
	fitBounds: true,
	showControls: true	
};