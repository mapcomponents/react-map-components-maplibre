import React, { useState } from 'react';
import MlTemporalController, { MlTemporalControllerProps } from './MlTemporalController';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import { Box, Typography } from '@mui/material';
import TopToolbar from '../../ui_components/TopToolbar';
import african_independency from './assets/african_independency.json';
import earthq_5plus from './assets/earthq_5plus.json';
import tour_de_france_2022 from './assets/tour_de_france_2022.json';
import { TemporalControllerValues } from './MlTemporalController';

interface TimeDisplayProps {
	value: TemporalControllerValues | undefined;
}

const storyoptions = {
	title: 'MapComponents/MlTemporalController',
	component: MlTemporalController,
	argTypes: {},
	decorators: mapContextDecorator,
	parameters: {
		sourceLink: 'components/MlTemporalController/MlTemporalController.tsx',
	},
};
export default storyoptions;


const FillTemplate = (props: MlTemporalControllerProps) => {
	const [current, setCurrent] = useState<TemporalControllerValues>();

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Typography variant="h6" color={'ButtonText'}>
						African countries by independecy year
					</Typography>
				}
			/>

			<MlTemporalController {...props} onStateChange={setCurrent} />
		</>
	);
};

const CircleTemplate = (props: MlTemporalControllerProps) => {
	const [current, setCurrent] = useState();

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Typography variant="h6" color={'ButtonText'}>
						Earthquakes with 5 or more magnitude in the mediterranean area
					</Typography>
				}
			/>
			<MlTemporalController {...props} onStateChange={setCurrent} />
		
		</>
	);
};

const LineTemplate = (props: MlTemporalControllerProps) => {
	const [current, setCurrent] = useState();

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Typography variant="h6" color={'ButtonText'}>
						Tour de France stages in 2022
					</Typography>
				}
			/>
			<MlTemporalController {...props} onStateChange={setCurrent} />
		
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
	initialVal: 1904,
	fitBounds: true,
	displayCurrentValue: true,
	attribution: 'Made with Natural Earth.',
	
};

export const CircleConfig = CircleTemplate.bind({});
CircleConfig.parameters = {};
CircleConfig.args = {
	geojson: earthq_5plus,
	timeField: 'Year',
	labelField: 'LocationName',
	accumulate: false,
	step: 0.3,
	minVal: 1900,
	fitBounds: true,
	onClick: () => console.log('clicked'),
	displayCurrentValue: true,
	attribution:
		'National Geophysical Data Center / World Data Service (NGDC/WDS): NCEI/WDS Global Significant Earthquake Database. NOAA National Centers for Environmental Information. doi:10.7289/V5TD9V7K',
};

export const LineConfig = LineTemplate.bind({});
LineConfig.parameters = {};
LineConfig.args = {
	geojson: tour_de_france_2022,
	timeField: 'Etape',
	type: 'line',
	labelField: 'Name',
	accumulate: true,
	fitBounds: true,	
	displayCurrentValue: true,
	attribution: 'Source: geovista.space ',
};
