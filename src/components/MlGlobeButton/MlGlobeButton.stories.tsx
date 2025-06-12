import React from 'react';

import MlGlobeButton from './MlGlobeButton';

import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlGlobeButton',
	component: MlGlobeButton,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => <MlGlobeButton />;

export const CatalogueDemo = Template.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {};
