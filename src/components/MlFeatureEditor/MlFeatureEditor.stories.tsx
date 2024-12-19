import React, { useEffect, useState } from 'react';
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
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
		if (!visible) {
			setTimeout(() => {
				setVisible(true);
			}, 750);
		}
	}, [visible]);

	return (
		<>
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
	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const [visible, setVisible] = useState(true);
	const [selectedMode, setSelectedMode] = useState<string>('EditPolygon');

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (!visible) {
			setTimeout(() => {
				setVisible(true);
			}, 750);
		}
	}, [visible]);

	return (
		<>
			<Box
				sx={{
					position: 'fixed',
					width: { xs: '100%', xl: 'auto' },
					top: { xs: '62px', sm: '64px', xl: '22px' },
					right: { xs: '0px', xl: '415px' },
					paddingRight: { xs: '20px', xl: '0px' },
					color: '#009ee0',
					backgroundColor: '#fff',
					textAlign: 'right',
					fontSize: '16px',
					fontFamily: 'sans-serif',
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					zIndex: 5000,
				}}
			>
				{mediaIsMobile
					? 'Zum Beenden erneut auf denselben Punkt klicken.'
					: 'Die Zeichnung kann beendet werden, indem erneut auf den zuletzt gezeichneten Punkt geklickt wird.'}
			</Box>
			<TopToolbar
				unmovableButtons={
					<>
						<Typography variant="h6" color={'ButtonText'} marginRight={'20px'} marginTop={'1px'}>
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
							<MenuItem onClick={() => setSelectedMode('EditPolygon')}>Edit Polygon</MenuItem>
							<MenuItem onClick={() => setSelectedMode('EditPoint')}>Edit Point</MenuItem>
							<MenuItem onClick={() => setSelectedMode('EditLinestring')}>Edit Linestring</MenuItem>
							<MenuItem onClick={() => setSelectedMode('DrawPolygon')}>Draw Polygon</MenuItem>
							<MenuItem onClick={() => setSelectedMode('DrawPoint')}>Draw Point</MenuItem>
							<MenuItem onClick={() => setSelectedMode('DrawLinestring')}>Draw Linestring</MenuItem>
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

export const CatalogueDemo = catalogueTemplate.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {};
