import React from "react";

import MlNavigationCompass from "./MlNavigationCompass";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
	title: "MapComponents/MlNavigationCompass",
	component: MlNavigationCompass,
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => <MlNavigationCompass {...props} />;

export const Standard = Template.bind({});
Standard.args = {
	style: {
		position: 'absolute',
		transform: 'scale(4)',
		left: '50%',
		top: '50%',
	},
};
export const StyleExample = Template.bind({});
StyleExample.args = {
	style: {
		position: 'absolute',
		transform: 'scale(4)',
		left: '50%',
		top: '50%',
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
