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
		transform: "scale(4)",
		left: "50%",
		marginLeft: "-100px",
		top: "50%",
		marginTop: "-100px",
	},
};
export const StyleExample = Template.bind({});
StyleExample.args = {
	style: {
		transform: "scale(4)",
		left: "50%",
		marginLeft: "-100px",
		top: "50%",
		marginTop: "-100px",
	},
	backgroundStyle: {
		border: "12px solid #adad44",
		background: "radial-gradient(#417741, #111)",
	},
	needleStyle: {
		":hover svg path:nth-of-type(1)": {
			fill: "#eded66",
		},
		":hover svg path:nth-of-type(2)": {
			fill: "#252f1b",
		},
		"svg path:nth-of-type(1)": {
			fill: "#adad44",
		},
		"svg path:nth-of-type(2)": {
			fill: "#1a1d15",
		},
	},
	rotateRightStyle: {
		"svg:hover path": {
			fill: "#ededb1",
		},
	},
	rotateLeftStyle: {
		"svg:hover path": {
			fill: "#ededb1",
		},
	},
};
