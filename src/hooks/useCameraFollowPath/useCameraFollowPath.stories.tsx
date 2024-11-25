import React, { useState } from 'react';
import useCameraFollowPath from './useCameraFollowPath';
import TopToolbar from '../../ui_components/TopToolbar';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import { Button, MenuItem, Slider, Typography } from '@mui/material';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { Feature } from 'geojson';
import Sidebar from '../../ui_components/Sidebar';

const storyoptions = {
	title: 'Hooks/useCameraFollowPath',
	component: useCameraFollowPath,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const routeJson: Feature = {
	type: 'Feature',
	properties: {},
	geometry: {
		type: 'LineString',
		coordinates: [
			[7.10942788610961, 50.708209240168],
			[7.10966149846967, 50.7088867160122],
			[7.10910082880551, 50.7108256986007],
			[7.10856352037736, 50.7126945974813],
			[7.1083532692533, 50.7142598002937],
			[7.10814301812924, 50.7160118929942],
			[7.10793276700518, 50.7169463424345],
			[7.10776923835314, 50.7176004570426],
			[7.10713848498096, 50.718838602551],
			[7.10699831756492, 50.7199599418793],
			[7.106900786313568, 50.72118132611057],
		],
	},
};

const marks = [
	{
		value: 15,
		label: '15',
	},
	{
		value: 16,
		label: '16',
	},
	{
		value: 17,
		label: '17',
	},
	{
		value: 18,
		label: '18',
	},
	{
		value: 19,
		label: '19',
	},
	{
		value: 20,
		label: '20',
	},
];

const Template = () => {
	const [state, setState] = useState({ pause: true, zoom: 18, speed: 1, pitch: 60 });

	const CameraFollowPath = useCameraFollowPath({
		route: routeJson,
		pause: state.pause,
		pitch: state.pitch,
		zoom: state.zoom,
		speed: state.speed,
	});

	const [showRoute, setShowRoute] = useState(true);
	const [openSidebar, setOpenSidebar] = useState(true);

	return (
		<>
			<TopToolbar
				buttons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
						sx={{ marginRight: { xs: '0px', sm: '10px' } }}
					>
						Camera Settings
					</Button>
				}
			/>
			<Sidebar
				open={openSidebar}
				setOpen={setOpenSidebar}
				name={'Camera Settings'}
			>
				<MenuItem onClick={() => setShowRoute(!showRoute)}>
					<Typography>{showRoute ? 'Hide route' : 'Show route'}</Typography>
				</MenuItem>
				{showRoute ? (
					<MlGeoJsonLayer
						geojson={routeJson}
						type="line"
						paint={{
							'line-width': 2,
							'line-color': 'blue',
						}}
					/>
				) : null}
				<MenuItem
					disabled={!state.pause}
					onClick={() =>
						setState((current) => {
							return { ...current, pause: false };
						})
					}
				>
					<Typography>Start</Typography>
				</MenuItem>
				<MenuItem
					disabled={state.pause}
					onClick={() =>
						setState((current) => {
							return { ...current, pause: true };
						})
					}
				>
					<Typography>Pause</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						setState((current) => {
							return { ...current, pause: true, pitch: 60, zoom: 18, speed: 1 };
						});
						setTimeout(() => {
							CameraFollowPath.reset();
						}, 50);
					}}
				>
					<Typography>Reset</Typography>
				</MenuItem>
				<MenuItem>
					<Typography id="discrete-slider" style={{ marginLeft: '10px', marginRight: '10px' }}>
						<Typography>Zoom:</Typography>
					</Typography>
					<Slider
						value={state.zoom}
						onChange={(ev, value) => {
							setState((current) => {
								return { ...current, zoom: Number(value) };
							});
						}}
						getAriaValueText={(value) => value.toString()}
						aria-labelledby="discrete-slider"
						//valueLabelDisplay="auto"
						step={1}
						marks={marks}
						min={15}
						max={20}
						sx={{
							marginTop: '20px',
							paddingBottom: '20px',
							marginRight: '10px',
							maxWidth: '200px',
							minWidth: '150px',
						}}
					/>
				</MenuItem>
				<MenuItem>
					<Typography id="discrete-slider2" style={{ marginLeft: '10px', marginRight: '10px' }}>
						Speed:
					</Typography>
					<Slider
						value={state.speed}
						onChange={(ev, value) => {
							setState((current) => {
								return { ...current, speed: Number(value) };
							});
						}}
						getAriaValueText={(value) => value.toString()}
						aria-labelledby="discrete-slider2"
						//valueLabelDisplay="auto"
						step={0.1}
						marks
						min={0.1}
						max={2}
						sx={{
							marginRight: '10px',
							maxWidth: '200px',
							minWidth: '150px',
						}}
					/>
				</MenuItem>
				<MenuItem
					onClick={() => {
						if (state.pitch === 0) {
							setState((current) => {
								return { ...current, pitch: 60 };
							});
						} else {
							setState((current) => {
								return { ...current, pitch: 0 };
							});
						}
					}}
				>
					<Typography>{state.pitch === 0 ? '3D' : '2D'}</Typography>
				</MenuItem>
			</Sidebar>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
