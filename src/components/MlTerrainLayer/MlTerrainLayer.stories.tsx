import React, { useState } from 'react';
import MlTerrainLayer from './MlTerrainLayer';
import MapContextDecorator from '../../decorators/MapContextDecorator';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlTerrainLayer',
	component: MlTerrainLayer,
	argTypes: {},
	decorators: MapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [start, setStart] = useState<boolean>(true);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<>
						<Button
							variant={start ? 'contained' : 'outlined'}
							className="terrainLayerButton"
							onClick={() => setStart(!start)}
						>
							Terrain Layer
						</Button>
					</>
				}
			/>
			{start && (
				<>
					<MlTerrainLayer
						sourceOptions={{
							tiles: [
								'https://wms.wheregroup.com/dem_tileserver/index.php/raster_dem/{z}/{x}/{y}.webp',
							],
						}}
					/>
				</>
			)}
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
