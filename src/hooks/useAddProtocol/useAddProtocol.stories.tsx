import React from 'react';

import useAddProtocol from './useAddProtocol';

import mapContextDecorator from '../../decorators/LowZoomDecorator';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import { LayerSpecification } from 'maplibre-gl';
import { mbTilesProtocolHandler } from '../../protocol_handlers/mbtiles';

const storyoptions = {
	title: 'hooks/useAddProtocol',
	component: useAddProtocol,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;


const Template = () => {
	useAddProtocol({
		protocol: 'mbtiles',
		handler: mbTilesProtocolHandler,
	});

	return (
		<>
			<MlVectorTileLayer
				mapId={'map_1'}
				url={'mbtiles://mbtiles/countries.mbtiles/{z}/{x}/{y}'}
				layers={
					[
						{
							id: 'countries',
							type: 'fill',
							'source-layer': 'countries',
							layout: {},
							paint: { 'fill-color': '#f9a5f5', 'fill-opacity': 0.5 },
						},
					] as unknown as LayerSpecification[]
				}
				insertBeforeLayer={'waterway-name'}
				sourceOptions={{
					type: 'vector',
					minzoom: 0,
					maxzoom: 1,
				}}
			/>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
