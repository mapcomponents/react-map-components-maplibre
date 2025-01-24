import React from 'react';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlFeatureDraw from './MlFeatureDraw';
import Sidebar from '../../ui_components/Sidebar';
import useFeatureDraw from '../../hooks/useFeatureDraw';
import { TerraDrawPointMode, TerraDrawPolygonMode, TerraDrawSelectMode } from 'terra-draw';
import DeleteIcon from '@mui/icons-material/Delete';

const storyoptions = {
	title: 'MapComponents/MlFeatureDraw',
	component: MlFeatureDraw,
	argTypes: {},
	decorators: mapContextDecorator,
};

export default storyoptions;
const Template = (args) => {
	const { startDrawing, stopDrawing, clearDrawing, isDrawing } = useFeatureDraw({
		mapId: 'map_1',
		mode: args.mode,
	});
	return (
		<>
			<Sidebar open={true}>
				<button disabled={isDrawing} onClick={() => startDrawing('polygon')}>
					{isDrawing ? 'Drawing...' : 'New Polygon'}
				</button>
				<button onClick={stopDrawing} disabled={!isDrawing}>
					{isDrawing ? 'Edit Feature' : 'Editing...'}
				</button>
				<button onClick={clearDrawing}>
					<DeleteIcon fontSize="small"></DeleteIcon>
				</button>
			</Sidebar>
		</>
	);
};
export const DrawPolygon = Template.bind({});
DrawPolygon.args = {
	mode: [
		new TerraDrawPolygonMode(),
		new TerraDrawSelectMode({
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
		}),
	],
};
export const DrawPoint = Template.bind({});
DrawPoint.args = {
	mode: [
		new TerraDrawPointMode(),
		new TerraDrawSelectMode({
			flags: {
				point: {
					feature: { draggable: true, deletable: true },
				},
			},
		}),
	],
};
