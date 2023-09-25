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
import { types } from '@storybook/addons';

const storyoptions = {
	title: 'MapComponents/MlFeatureEditor',
	component: MlFeatureEditor,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
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
					<>
						<Button
							variant={visible ? 'contained' : 'outlined'}
							onClick={() => {
								setVisible(false);
							}}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Restart
						</Button>
					</>
				}
			/>
		</>
	);
};

const catalogueTemplate = (args: useFeatureEditorProps) => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [visible, setVisible] = useState(true);
	const [editPolygonButton, setEditPolygonButton] = useState(true);
	const [editPointButton, setEditPointButton] = useState(false);
	const [editLineStringButton, setEditLineStringButton] = useState(false);
	const [drawPolygonButton, setDrawPolygonButton] = useState(false);
	const [drawPointButton, setDrawPointButton] = useState(false);
	const [drawLineStringButton, setDrawLineStringButton] = useState(false);
	const [setter, setSetter] = useState<number>(0);

	const handleChange1 = () => {
		setEditPolygonButton(!editPolygonButton);
		setSetter[0];
	};
	const handleChange2 = () => {
		setEditPointButton(!editPointButton);
		setSetter[1];
	};
	const handleChange3 = () => {
		setEditLineStringButton(!editLineStringButton);
		setSetter[2];
	};
	const handleChange4 = () => {
		setDrawPolygonButton(!drawPolygonButton);
		setSetter[3];
	};
	const handleChange5 = () => {
		setDrawPointButton(!drawPointButton);
		setSetter[4];
	};
	const handleChange6 = () => {
		setDrawLineStringButton(!drawLineStringButton);
		setSetter[5];
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
			<TopToolbar
				unmovableButtons={
					<>
						<Button
							variant={visible ? 'contained' : 'outlined'}
							onClick={() => {
								setVisible(false);
							}}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Restart
						</Button>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Options
						</Button>
					</>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Feature Editor'}>
				<FormGroup>
					<FormControlLabel
						control={<Switch checked={editPolygonButton} onChange={handleChange1} />}
						label="Edit Polygon"
					/>
					<FormControlLabel
						control={<Switch checked={editPointButton} onChange={handleChange2} />}
						label="Edit Point"
					/>
					<FormControlLabel
						control={<Switch checked={editLineStringButton} onChange={handleChange3} />}
						label="Edit Linestring"
					/>
					<FormControlLabel
						control={<Switch checked={drawPolygonButton} onChange={handleChange4} />}
						label="Draw Polygon"
					/>
					<FormControlLabel
						control={<Switch checked={drawPointButton} onChange={handleChange5} />}
						label="Draw Point"
					/>
					<FormControlLabel
						control={<Switch checked={drawLineStringButton} onChange={handleChange6} />}
						label="Draw Linestring"
					/>
				</FormGroup>
			</Sidebar>
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

export const catalogueDemo = catalogueTemplate.bind({});
catalogueDemo.parameters = {};
catalogueDemo.args = {};



/*
	const DemoArgOptions = () => {
		const Options = [EditPolygon,
			EditPoint,
			EditLinestring,
			DrawPolygon,
			DrawPoint,
			DrawLinestring,
		];
		return Options[setter]
		}
	*/