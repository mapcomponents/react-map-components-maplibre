import React, { useEffect, useState } from 'react';
import MlTerrainLayer from './MlTerrainLayer';
import MapContextDecorator from '../../decorators/MapContextDecorator';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button } from '@mui/material';
import useMap from '../../hooks/useMap';

const storyoptions = {
	title: 'MapComponents/MlTerrainLayer',
	component: MlTerrainLayer,
	argTypes: {},
	decorators: MapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [active, setActive] = useState<boolean>(true);

	const mapHook = useMap({ mapId: 'map_1' });
	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map.map.setCenter([11.200688, 47.427417]);
		mapHook.map.map.setZoom(12);
		mapHook.map.map.setPitch(60);
	}, [mapHook.map]);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<>
						<Button
							variant={active ? 'contained' : 'outlined'}
							className="terrainLayerButton"
							onClick={() => setActive(!active)}
						>
							Terrain Layer
						</Button>
					</>
				}
			/>
			{active && (
				<>
					<MlTerrainLayer
						sourceOptions={{
							tiles: ['https://wms.wheregroup.com/dem_tileserver/raster_dem/{z}/{x}/{y}.webp'],
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
