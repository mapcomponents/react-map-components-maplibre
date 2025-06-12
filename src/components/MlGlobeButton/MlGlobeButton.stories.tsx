import React from 'react';

import MlGlobeButton, { MlGlobeButtonProps } from './MlGlobeButton';

import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlGlobeButton',
	component: MlGlobeButton,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props: MlGlobeButtonProps) => <MlGlobeButton {...props} />;

export const CatalogueDemo = Template.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {
	style: {
		position: 'absolute',
		transform: 'scale(5)',
		left: '50%',
		top: '60%',
	},
};
