import React from 'react';
import MlLayerMagnify from './MlLayerMagnify';
import MlWmsLayer from '../MlWmsLayer/MlWmsLayer';
import multiMapContextDecorator from '../../decorators/MultiMapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlLayerMagnify',
	component: MlLayerMagnify,
	argTypes: {},
	decorators: multiMapContextDecorator,
};
export default storyoptions;

interface TemplateProps {
	wmsLayerMapId: string;
	magnifierRadius: number;
}

const Template = (args: TemplateProps) => (
	<>
		<MlWmsLayer
			url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme"
			urlParameters={{
				layers: 'nw_uraufnahme_rw',
			}}
			sourceOptions={{
				minzoom: 13,
				maxzoom: 20,
			}}
			mapId={args.wmsLayerMapId}
			
		/>
		<MlLayerMagnify map1Id="map_1" map2Id="map_2" magnifierStyle={{border:'2px solid grey'}} magnifierRadius={args.magnifierRadius} />
	</>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	wmsLayerMapId: 'map_2',
	magnifierRadius: 200,
};
