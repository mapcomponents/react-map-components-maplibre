import React, { useState } from 'react';
import MlWmsLayer from '../MlWmsLayer/MlWmsLayer';
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
						<Button variant={start ? 'contained' : 'outlined'} onClick={() => setStart(!start)}>
							Terrain Layer
						</Button>
					</>
				}
			/>
			{start && (
				<>
					<MlWmsLayer
						urlParameters={{
							LAYERS: 'de_basemapde_web_raster_hillshade',
							TRANSPARENT: 'TRUE',
						}}
						url="https://sgx.geodatenzentrum.de/wms_basemapde_schummerung"
					/>
					<MlTerrainLayer
						sourceOptions={{
							tiles: ['https://vtc-cdn.maptoolkit.net/terrainrgb/{z}/{x}/{y}.webp'],
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
