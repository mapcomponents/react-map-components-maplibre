import React, { useState, useEffect } from 'react';

import MlTemporalController from './MlTemporalController';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import { Box, Typography } from '@mui/material';


const storyoptions = {
	title: 'MapComponents/MlTemporalController',
	component: MlTemporalController,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
	const [data, setData] = useState();
	const [current, setCurrent] = useState();

	useEffect(() => {
		fetch('assets/african_independency.json')
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				setData(json);
			});
	}, []);


	return (
		<>
	
			{data && (
				<MlTemporalController
					geojson={data}
					mapId={'map_1'}
					type={'fill'}
					fitBounds={true}
					timeField={'africa_independency_year'}
					labelField={'africa_independency_year'}
					callback={setCurrent}
					steps={1}
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
