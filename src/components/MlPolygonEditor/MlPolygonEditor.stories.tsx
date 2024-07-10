import React, { useEffect, useState } from 'react';

import MlPolygonEditor from './MlPolygonEditor';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import { Button } from '@mui/material';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import { Feature, FeatureCollection } from '@turf/turf';
import PentagonIcon from '@mui/icons-material/Pentagon';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import MlFeatureEditor from '../MlFeatureEditor/MlFeatureEditor';

const storyoptions = {
	title: 'MapComponents/MlPolygonEditor',
	component: MlPolygonEditor,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [editor, showEditor] = useState(false);
	const [selectedFeature, setSelectedFeature] = useState<Feature>();
	const [geoJson, setGeoJson] = useState<FeatureCollection>({
		type: 'FeatureCollection',
		features: [],
	});
	const [newGeoJson, setNewGeoJson] = useState<any>();
	/*
	useEffect(() => {
		setSelectedFeature(geoJson.features[0]);
	}, [geoJson]);
*/

	useEffect(() => {
		setGeoJson((current) => {
			const modifiedGeoJson = { ...current };
			modifiedGeoJson.features = [newGeoJson];
			return modifiedGeoJson as any;
		});
		setSelectedFeature(newGeoJson as any);
	}, [newGeoJson]);

	return (
		<>
			<TopToolbar
				buttons={
					<>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Polygon Editor
						</Button>
					</>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Polygon Editor'}>
				<MlPolygonEditor
					inputPolygon={selectedFeature}
					getResult={(result: Feature) => {
						setGeoJson((current) => {
							const newGeojson = { ...current };
							const newFeatures: Feature[] = [...current.features];
							// newfeatures.id -> newId
							newFeatures.push(result);
							newGeojson.features = newFeatures as any;
							setSelectedFeature(result);
							return newGeojson;
						});
					}}
					//newGeojson.features[] --> index des Features mit der gleichen Id wie "result" bzw "selectedFeature"

					modifyResult={(result: Feature) => {
						setGeoJson((current) => {
							const newGeojson = { ...current };
							console.log('result:', result);
							newGeojson.features = [result];
							return newGeojson;
						});
						setSelectedFeature(result);
					}}
				/>
				<MlGeoJsonLayer
					geojson={geoJson}
					onClick={(event: any) => {
						setSelectedFeature({
							type: event.features[0].type,
							geometry: event.features[0].geometry,
							id: event.features[0].id,
						} as Feature);
					}}
				/>

				<Button variant="outlined" onClick={() => showEditor(!editor)}>
					<PentagonIcon />
				</Button>
				{editor && (
					<MlFeatureEditor
						onChange={(state) => {
							state && setNewGeoJson(state[0]);
						}}
						onFinish={() => {
							showEditor(false);
						}}
						mode="draw_polygon"
					></MlFeatureEditor>
				)}
			</Sidebar>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
