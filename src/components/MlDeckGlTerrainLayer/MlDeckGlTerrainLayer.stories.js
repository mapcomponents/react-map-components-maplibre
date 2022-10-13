import React, { useState } from 'react';
import MlCameraFollowPath from '../MlCameraFollowPath/MlCameraFollowPath';
import TopToolbar from '../../ui_components/TopToolbar';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import { Button, Slider, Typography } from '@mui/material';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import MlNavigationTools from '../MlNavigationTools/MlNavigationTools';

import MlDeckGlTerrainLayer from './MlDeckGlTerrainLayer';

const storyoptions = {
	title: 'MapComponents/MlDeckGlTerrainLayer',
	component: MlDeckGlTerrainLayer,
	argTypes: {
		options: {
			control: {
				type: 'object',
			},
		},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const routeJson = {
	type: 'Feature',
	properties: {},
	geometry: {
		type: 'LineString',
		coordinates: [
			[11.200688, 47.427417],
			[9.874942, 47.215719],
		],
	},
};

const marks = [
	{
		value: 8,
		label: '8',
	},
	{
		value: 9,
		label: '9',
	},
	{
		value: 10,
		label: '11',
	},
	{
		value: 11,
		label: '11',
	},
	{
		value: 12,
		label: '12',
	},
	{
		value: 13,
		label: '13',
	},
];

const Template = (args) => {
	const [pause, setPause] = useState(false);
	const [zoom, setZoom] = useState(11);
	const [speed, setSpeed] = useState(10);
	const [pitch, setPitch] = useState('3D');
	const [disable, setDisable] = useState(false);

	const CameraFollowPath = MlCameraFollowPath({
		route: routeJson,
		pause: pause,
		pitch: pitch,
		zoom: zoom,
		speed: speed,
	});

	function doPlay(event) {
		setPause(false);
		setTimeout(() => {
			CameraFollowPath.play();
		}, 10);
		setDisable(true);
	}
	function doReset() {
		setPause(true);
		CameraFollowPath.reset();
		setDisable(false);
		setPitch('3D');
		setZoom(11);
		setSpeed(10);
	}
	function doPitch() {
		if (pitch === '2D') {
			setPitch('3D');
		} else {
			setPitch('2D');
		}
	}

	return (
		<>
			<TopToolbar>
				<MlDeckGlTerrainLayer />
				<Button disabled={disable} onClick={doPlay}>
					Start
				</Button>
				<Button disabled={!disable} onClick={() => (setPause(true), setDisable(false))}>
					Pause
				</Button>
				<Button onClick={doReset}>Reset</Button>
				<Typography
					id="discrete-slider"
					style={{ color: '#121212', marginLeft: '10px', marginRight: '10px' }}
				>
					Zoom:
				</Typography>
				<Slider
					value={zoom}
					onChange={(ev, value) => {
						setZoom(value);
					}}
					getAriaValueText={(value) => value}
					aria-labelledby="discrete-slider"
					//valueLabelDisplay="auto"
					step={1}
					marks={marks}
					min={8}
					max={13}
					sx={{
						marginTop: '20px',
						paddingBottom: '20px',
						marginRight: '10px',
						maxWidth: '200px',
					}}
				/>
				<Typography
					id="discrete-slider2"
					style={{ color: '#121212', marginLeft: '10px', marginRight: '10px' }}
				>
					Speed:
				</Typography>
				<Slider
					value={speed}
					onChange={(ev, value) => {
						setSpeed(value);
					}}
					getAriaValueText={(value) => value}
					aria-labelledby="discrete-slider2"
					//valueLabelDisplay="auto"
					step={1}
					marks
					min={1}
					max={20}
					sx={{
						marginRight: '10px',
						maxWidth: '200px',
					}}
				/>
				<Button onClick={doPitch}>{pitch === '2D' ? '3D' : '2D'}</Button>
			</TopToolbar>
			<MlGeoJsonLayer
				geojson={routeJson}
				type="line"
				paint={{
					'line-width': 2,
					'line-color': 'blue',
				}}
			/>
			{/*
      		<MlNavigationTools />
       	 	*/}
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
