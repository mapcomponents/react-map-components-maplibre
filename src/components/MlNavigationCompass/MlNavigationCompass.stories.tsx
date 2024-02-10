import React from 'react';
import MlNavigationCompass, { MlNavigationCompassProps } from './MlNavigationCompass';
import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlNavigationCompass',
	component: MlNavigationCompass,
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props:MlNavigationCompassProps) => <MlNavigationCompass {...props} />;

export const CatalogueDemo = Template.bind({});
CatalogueDemo.args = {
	style: {
		position: { xs: 'absolute' },
		transform: { xs: 'scale(4)' },
		left: { xs: '75%', sm: '65%', md: '55%' },
		top: { xs: '50%', md: '55%' },
	},
};
export const StyleExample = Template.bind({});
StyleExample.args = {
	style: {
		position: { xs: 'absolute' },
		transform: { xs: 'scale(4)' },
		left: { xs: '75%', sm: '65%', md: '55%' },
		top: { xs: '50%', md: '55%' },
	},
	backgroundStyle: {
		'svg circle': {
			stroke: '#adad44',
		},
		'svg path': {
			fill: '#adad44',
		},
	},
	needleStyle: {
		'svg path:nth-of-type(1)': {
			fill: '#CF003D',
		},
		'svg path:nth-of-type(2)': {
			fill: '#1a1d15',
		},
	},
};
