import React from 'react';
import MlNavigationCompass from './MlNavigationCompass';
import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlNavigationCompass',
	component: MlNavigationCompass,
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => <MlNavigationCompass {...props} />;

export const Standard = Template.bind({});
Standard.args = {
	style: {
		position: { xs: 'absolute' },
		transform: { xs: 'scale(4)' },
		left: { xs: '75%', md: '50%' },
		top: { xs: '50%' },
	},
};
export const StyleExample = Template.bind({});
StyleExample.args = {
	style: {
		position: { xs: 'absolute' },
		transform: { xs: 'scale(4)' },
		left: { xs: '75%', md: '50%' },
		top: { xs: '50%' },
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
