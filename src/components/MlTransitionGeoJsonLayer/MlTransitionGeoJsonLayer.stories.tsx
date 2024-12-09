import React, { useState, useRef, useEffect } from 'react';

import MlTransitionGeoJsonLayer, { MlTransitionGeoJsonLayerProps } from './MlTransitionGeoJsonLayer';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import useMap from '../../hooks/useMap';
import TopToolbar from '../../ui_components/TopToolbar';

import sample_geojson_1 from './assets/sample_1.json';
import sample_geojson_2 from './assets/sample_2.json';

import { Button } from '@mui/material';
import { Feature } from 'geojson';

const storyoptions = {
	title: 'MapComponents/MlTransitionGeoJsonLayer',
	component: MlTransitionGeoJsonLayer,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const LinestringTransitionTemplate = (props:MlTransitionGeoJsonLayerProps) => {
	const mapHook = useMap({ mapId: 'map_1' });
	const [geojson, setGeojson] = useState<Feature>(sample_geojson_1 as Feature);
	const initializedRef = useRef(false);
	const [disabled, setDisabled] = useState(true);

	useEffect(()=>{
		enableButton(6000)
	}, []);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.setCenter({ lng: 7.137609868988648, lat: 50.74746799549129 });
		mapHook.map.setZoom(9.5);

		setTimeout(() => {
			toogleSource();
		}, 3000);
	}, [geojson, mapHook.map]);

	function toogleSource() {
		if (geojson?.properties?.name === 'sample1') {
			setGeojson(sample_geojson_2 as Feature);
		} else if (geojson?.properties?.name === 'sample2') {
			setGeojson(sample_geojson_1 as Feature);
		}
	}

	function enableButton(time:number) {
		setTimeout(()=>{setDisabled(false)}, time);
	}

	return (
		<>
			<TopToolbar
			unmovableButtons={
					<Button
						variant="outlined"
						onClick={() => {
							toogleSource();
							setDisabled(true)
							enableButton(2800);
						}}
						sx={{ marginRight: { xs: '5px', sm: '10px' } }}
						disabled={disabled}
					>
						Restart
					</Button>
				}
			/>
			<MlTransitionGeoJsonLayer type="line" geojson={geojson} transitionTime={2000} {...props} />
		</>
	);
};

export const ExampleConfig = LinestringTransitionTemplate.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	paint: { 'line-color': 'red', 'line-width': 4 },
};
