import React from 'react';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlFeatureDraw from './MlFeatureDraw';
import Sidebar from '../../ui_components/Sidebar';
import useFeatureDraw from '../../hooks/useFeatureDraw';
import {
	TerraDrawPointMode,
	TerraDrawLineStringMode,
	TerraDrawPolygonMode,
	TerraDrawRectangleMode,
	TerraDrawFreehandMode,
	TerraDrawCircleMode,
	TerraDrawSelectMode,
} from 'terra-draw';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Tooltip } from '@mui/material';
import DrawIcon from '@mui/icons-material/Draw';

const storyoptions = {
	title: 'MapComponents/MlFeatureDraw',
	component: MlFeatureDraw,
	argTypes: {
		modeType: {
			control: {
				type: 'select',
				options: ['point', 'linestring', 'polygon', 'rectangle', 'freehand', 'circle'],
			},
			defaultValue: 'polygon',
		},
	},
	decorators: mapContextDecorator,
};

export default storyoptions;

const Template = (args: { modeType: string }) => {
	const modes = React.useMemo(() => {
		let baseMode;
		let selectConfig;

		switch (args.modeType) {
			case 'point':
				baseMode = new TerraDrawPointMode();
				selectConfig = {
					flags: {
						point: {
							feature: { draggable: true },
						},
					},
				};
				break;

			case 'linestring':
				baseMode = new TerraDrawLineStringMode();
				selectConfig = {
					flags: {
						linestring: {
							feature: {
								draggable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},
					},
				};
				break;

			case 'polygon':
				baseMode = new TerraDrawPolygonMode();
				selectConfig = {
					flags: {
						polygon: {
							feature: {
								draggable: true,
								rotateable: true,
								scaleable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},
					},
				};
				break;

			case 'rectangle':
				baseMode = new TerraDrawRectangleMode();
				selectConfig = {
					flags: {
						polygon: {
							feature: {
								draggable: true,
								rotateable: true,
								scaleable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},
					},
				};
				break;

			case 'freehand':
				baseMode = new TerraDrawFreehandMode();
				selectConfig = {
					flags: {
						polygon: {
							feature: {
								draggable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},
					},
				};
				break;

			case 'circle':
				baseMode = new TerraDrawCircleMode();
				selectConfig = {
					flags: {
						polygon: {
							feature: {
								draggable: true,
								rotateable: true,
								scaleable: true,
							},
						},
					},
				};
				break;

			default:
				throw new Error(`Unknown mode type: ${args.modeType}`);
		}

		return [baseMode, new TerraDrawSelectMode(selectConfig)];
	}, [args.modeType]);

	const { startDrawing, stopDrawing, clearDrawing, isDrawing } = useFeatureDraw({
		mapId: 'map_1',
		mode: modes,
	});
	return (
		<>
			<Sidebar open={true}>
				<ButtonGroup size="small">
					<Tooltip title="Draw">
						<Button
							variant={isDrawing ? 'contained' : 'outlined'}
							onClick={() => startDrawing(args.modeType)}
						>
							<DrawIcon />
							{`Draw ${args.modeType}`}
						</Button>
					</Tooltip>
					<Button variant={!isDrawing ? 'contained' : 'outlined'} onClick={stopDrawing}>
						<EditIcon />
					</Button>
					<Button onClick={clearDrawing}>
						<DeleteIcon />
					</Button>
				</ButtonGroup>
			</Sidebar>
		</>
	);
};

export const DrawPoint = Template.bind({});
DrawPoint.args = { modeType: 'point' };

export const DrawLine = Template.bind({});
DrawLine.args = { modeType: 'linestring' };

export const DrawPolygon = Template.bind({});
DrawPolygon.args = { modeType: 'polygon' };

export const DrawRectangle = Template.bind({});
DrawRectangle.args = { modeType: 'rectangle' };

export const DrawFreehand = Template.bind({});
DrawFreehand.args = { modeType: 'freehand' };

export const DrawCircle = Template.bind({});
DrawCircle.args = { modeType: 'circle' };
