import React from 'react';

import MapContextDecorator from '../../decorators/MapContextDecorator';
import MlOgcApiFeatures, { MlOgcApiFeaturesProps } from './MlOgcApiFeatures';

const storyoptions = {
	title: 'MapComponents/MlOgcApiFeatures',
	component: MlOgcApiFeatures,
	argTypes: {},
	decorators: MapContextDecorator,
};
export default storyoptions;

const PointTemplate = (props: MlOgcApiFeaturesProps) => {
	return (
		<>
			<MlOgcApiFeatures ogcApiUrl={props.ogcApiUrl}></MlOgcApiFeatures>
		</>
	);
};
export const Point = PointTemplate.bind({});
Point.parameters = {};
Point.args = {
	title: 'Stuff',
	ogcApiUrl: 'https://geo.kreis-viersen.de/ows/osm-daten/wfs3/collections/hoflaeden_nrw/items.json',
};
