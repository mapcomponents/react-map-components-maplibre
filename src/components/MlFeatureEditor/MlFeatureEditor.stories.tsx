import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MlFeatureEditor from './MlFeatureEditor';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import TopToolbar from '../../ui_components/TopToolbar';
import { useFeatureEditorProps } from 'src/hooks/useFeatureEditor/useFeatureEditor';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Sidebar from '../../ui_components/Sidebar';

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
						variant={visible ? 'contained' : 'outlined'}
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
			;
		</>
	);
};

const catalogueTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [visible, setVisible] = useState(true);
	const [selectedMode, setSelectedMode] = useState<string | undefined>();

	const handleLayerSelect = (mode: string) => {
		if (mode === selectedMode) {
			setSelectedMode(undefined);
		} else {
			setSelectedMode(mode);
		}
	};

	useEffect(() => {
		if (visible === false) {
			setTimeout(() => {
				setVisible(true);
			}, 750);
		}
	}, [visible]);

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Feature Editor'}>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={selectedMode === 'EditPolygon'}
								onChange={() => handleLayerSelect('EditPolygon')}
							/>
						}
						label="Edit Polygon"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={selectedMode === 'EditPoint'}
								onChange={() => handleLayerSelect('EditPoint')}
							/>
						}
						label="Edit Point"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={selectedMode === 'EditLinestring'}
								onChange={() => handleLayerSelect('EditLinestring')}
							/>
						}
						label="Edit Linestring"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={selectedMode === 'DrawPolygon'}
								onChange={() => handleLayerSelect('DrawPolygon')}
							/>
						}
						label="Draw Polygon"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={selectedMode === 'DrawPoint'}
								onChange={() => handleLayerSelect('DrawPoint')}
							/>
						}
						label="Draw Point"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={selectedMode === 'DrawLinestring'}
								onChange={() => handleLayerSelect('DrawLinestring')}
							/>
						}
						label="Draw Linestring"
					/>
				</FormGroup>
			</Sidebar>
			{selectedMode === 'EditPolygon' && (
				<Template mode={EditPolygon.args.mode} geojson={EditPolygon.args.geojson} />
			)}
			{selectedMode === 'EditPoint' && (
				<Template mode={EditPoint.args.mode} geojson={EditPoint.args.geojson} />
			)}
			{selectedMode === 'EditLinestring' && (
				<Template mode={EditLinestring.args.mode} geojson={EditLinestring.args.geojson} />
			)}
			{selectedMode === 'DrawPolygon' && <Template mode={DrawPolygon.args.mode} />}
			{selectedMode === 'DrawPoint' && <Template mode={DrawPoint.args.mode} />}
			{selectedMode === 'DrawLinestring' && <Template mode={DrawLinestring.args.mode} />}
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

export const catalogueDemo = catalogueTemplate.bind({});
catalogueDemo.parameters = {};
catalogueDemo.args = {};
