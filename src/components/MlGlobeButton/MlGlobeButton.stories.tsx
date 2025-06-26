import React from 'react';

import MlGlobeButton, { MlGlobeButtonProps } from './MlGlobeButton';

import lowZoomDecorator from '../../decorators/LowZoomDecorator';

const storyoptions = {
	title: 'MapComponents/MlGlobeButton',
	component: MlGlobeButton,
	argTypes: {},
	decorators: lowZoomDecorator,
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
