import React, { useState } from 'react';
import MapLibreMap from '../MapLibreMap/MapLibreMap';
import MlWmsLayer from '../MlWmsLayer/MlWmsLayer';
import MlTerrainLayer from './MlTerrainLayer';
import ThemeDecorator from '../../decorators/ThemeDecorator';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlTerrainLayer',
	component: MlTerrainLayer,
	argTypes: {},
	decorators: ThemeDecorator,
};
export default storyoptions;

const Template = () => {
	const [start, setStart] = useState<boolean>(true);

	const mapOptions: object = {
		zoom: 4,
		style: 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json',
		center: [7.0851268, 50.73884],
	};
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
			<MapLibreMap options={mapOptions} mapId="map_1" />

			{start && (
				<>
					<MlTerrainLayer
						sourceOptions={{
							tiles: ['https://vtc-cdn.maptoolkit.net/terrainrgb/{z}/{x}/{y}.webp'],
						}}
					/>
					<MlWmsLayer
						urlParameters={{
							layers: 'de_basemapde_web_raster_hillshade',
						}}
						url="https://sgx.geodatenzentrum.de/wms_basemapde_schummerung"
					/>
				</>
			)}
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
