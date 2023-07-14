import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MlFeatureEditor from './MlFeatureEditor';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import TopToolbar from '../../ui_components/TopToolbar';
import { useFeatureEditorProps } from 'src/hooks/useFeatureEditor/useFeatureEditor';

const storyoptions = {
	title: 'MapComponents/MlFeatureEditor',
	component: MlFeatureEditor,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;



const Template = (args: useFeatureEditorProps) => {


	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (visible === false) {
			setTimeout(() => {
				setVisible(true);
			}, 750);
		}
	}, [visible]);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						variant={ visible ? 'contained' : 'outlined'}
						onClick={() => {
							setVisible(false);
						}}
						sx={{ marginRight: { xs: '0px', sm: '10px' } }}
					>
						Restart
					</Button>
				}
			/>
			{visible && (
				<MlFeatureEditor
					{...args}
					onChange={(features) => {
						console.log(features);
					}}
				/>
			)}
		</>
	);
};

export const EditPolygon = Template.bind({});
EditPolygon.args = {
	mode: 'simple_select',
	geojson: {
		type: 'Feature',
		properties: {},
		geometry: {
			coordinates: [
				[
					[7.0904979943736635, 50.73948334574527],
					[7.087554458473562, 50.73827346433987],
					[7.093562913197076, 50.73723639825727],
					[7.096294028980594, 50.7387727842636],
					[7.0904979943736635, 50.73948334574527],
				],
			],
			type: 'Polygon',
		},
	},
};

export const EditPoint = Template.bind({});
EditPoint.args = {
	mode: 'simple_select',
	geojson: {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Point',
			coordinates: [7.0851268, 50.73884],
		},
	},
};

export const EditLinestring = Template.bind({});
EditLinestring.args = {
	mode: 'simple_select',
	geojson: {
		type: 'Feature',
		properties: {},
		geometry: {
			coordinates: [
				[7.0904979943736635, 50.73948334574527],
				[7.087554458473562, 50.73827346433987],
				[7.093562913197076, 50.73723639825727],
				[7.096294028980594, 50.7387727842636],
			],
			type: 'LineString',
		},
	},
};

export const DrawPolygon = Template.bind({});
DrawPolygon.args = {
	mode: 'draw_polygon',
};

export const DrawPoint = Template.bind({});
DrawPoint.args = {
	mode: 'draw_point',
};

export const DrawLinestring = Template.bind({});
DrawLinestring.args = {
	mode: 'draw_line_string',
};
