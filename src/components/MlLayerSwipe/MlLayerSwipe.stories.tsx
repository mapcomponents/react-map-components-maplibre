import React from 'react';
import MlLayerSwipe from './MlLayerSwipe';
import MlWmsLayer from '../MlWmsLayer/MlWmsLayer';

import multiMapContextDecorator from '../../decorators/MultiMapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlLayerSwipe',
	component: MlLayerSwipe,
	argTypes: {},
	decorators: multiMapContextDecorator,
};

export default storyoptions;

const Template = () => (
	<>
		<MlWmsLayer
			url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme"
			urlParameters={{
				layers: 'nw_uraufnahme_rw',
			}}
			mapId="map_2"
		/>
		<MlLayerSwipe map1Id="map_1" map2Id="map_2" />
	</>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
