import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import MlFeatureEditor from './MlFeatureEditor';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import TopToolbar from '../../ui_components/TopToolbar';
import { useFeatureEditorProps } from 'src/hooks/useFeatureEditor/useFeatureEditor';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const storyoptions = {
	title: 'MapComponents/MlFeatureEditor',
	component: MlFeatureEditor,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const configTitles = {
	EditPolygon: 'Edit Polygon',
	EditPoint: 'Edit Point',
	EditLinestring: 'Edit Linestring',
	DrawPolygon: 'Draw Polygon',
	DrawPoint: 'Draw Point',
	DrawLinestring: 'Draw Linestring',
};

const Template = (args: useFeatureEditorProps) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (visible === false) {
			setTimeout(() => {
				setVisible(true);
			}, 750);
		}
	}, [visible]);

	/* TopToolbar:
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
			*/

	return <>{visible && <MlFeatureEditor {...args} />};</>;
};

const catalogueTemplate = () => {
	const [visible, setVisible] = useState(true);
	const [selectedMode, setSelectedMode] = useState<string>('Polygon');

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLayerSelect = (mode: string) => {
		setSelectedMode(mode);
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
						<Typography variant="h6" color={'ButtonText'} marginRight={'20px'}>
							{configTitles[selectedMode]}
						</Typography>
						<Button
							id="basic-button"
							variant="contained"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							Example Configs
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem onClick={() => handleLayerSelect('EditPolygon')}>Edit Polygon</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('EditPoint')}>Edit Point</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('EditLinestring')}>
								Edit Linestring
							</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('DrawPolygon')}>Draw Polygon</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('DrawPoint')}>Draw Point</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('DrawLinestring')}>
								Draw Linestring
							</MenuItem>
						</Menu>
					</>
				}
			/>
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
