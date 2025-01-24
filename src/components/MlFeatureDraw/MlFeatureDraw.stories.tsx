import React from 'react';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlFeatureDraw from './MlFeatureDraw';
import Sidebar from '../../ui_components/Sidebar';
import useFeatureDraw from '../../hooks/useFeatureDraw';
import { TerraDrawPolygonMode } from 'terra-draw';

const storyoptions = {
	title: 'MapComponents/MlFeatureDraw',
	component: MlFeatureDraw,
	argTypes: {},
	decorators: mapContextDecorator,
};

export default storyoptions;
const Template = () => {
	const { startDrawing, stopDrawing, isDrawing } = useFeatureDraw({
		mapId: 'map_1',
		mode: [new TerraDrawPolygonMode()],
	});
	return (
		<>
			<Sidebar open={true}>
				<button onClick={() => startDrawing('polygon')}>
					{isDrawing ? 'Drawing...' : 'Start Drawing Polygon'}
				</button>
				<button onClick={stopDrawing} disabled={!isDrawing}>
					Stop Drawing
				</button>
			</Sidebar>
		</>
	);
};
export const DrawPolygon = Template.bind({});
DrawPolygon.args = {};
