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
							// Rectangles are typically stored as polygons
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
							// Freehand creates polygon-like features
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
							// Circles are often represented as polygons
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
				<button disabled={isDrawing} onClick={() => startDrawing(args.modeType)}>
					{isDrawing ? 'Drawing...' : `Draw ${args.modeType}`}
				</button>
				<button onClick={stopDrawing} disabled={!isDrawing}>
					{isDrawing ? 'Edit Feature' : 'Editing...'}
				</button>
				<button onClick={clearDrawing}>
					<DeleteIcon fontSize="small" />
				</button>
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
