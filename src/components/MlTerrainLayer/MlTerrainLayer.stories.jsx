import React from 'react';
import { MapLibreMap } from '../MapLibreMap/MapLibreMap';
import { MlWmsLayer } from '../MlWmsLayer/MlWmsLayer';
import MlTerrainLayer from './MlTerrainLayer';
import EmptyMapDecorator from '../../decorators/EmptyMapDecorator';

const storyoptions = {
	title: 'MapComponents/MlTerrainLayer',
	component: MlTerrainLayer,
	argTypes: {},
	decorators: EmptyMapDecorator,
};
export default storyoptions;


const Template = (props) => {
	const mapOptions = {
		zoom: 4,
		style: 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json',
		center: [7.0851268, 50.73884],
	};
	return (
		<>
			<MapLibreMap options={mapOptions} mapId="map_1" />
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
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
