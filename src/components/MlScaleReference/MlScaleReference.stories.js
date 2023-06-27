import React from "react";

import MlScaleReference from "./MlScaleReference";

import TopToolbar from "../../ui_components/TopToolbar";
import mapContextDecorator from "../../decorators/MapContextDecorator";
import useMediaQuery from "@mui/material/useMediaQuery";

const storyoptions = {
	title: 'MapComponents/MlScaleReference',
	component: MlScaleReference,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const ToolbarTemplate = (props) => {
	return <TopToolbar unmovableButtons={<MlScaleReference {...props} />} />;
};
const OverlayTemplate = (props) => {
	const mediaIsMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

	return (
		<div
			style={{
				position: "absolute",
				zIndex: 100000,
				bottom: mediaIsMobile ? "40px" : "20px",
				right: "20px",
			}}
		>
			<MlScaleReference {...props} />
		</div>
	);
};

export const Toolbar = ToolbarTemplate.bind({});
Toolbar.args = {
	show: "toolbar",
};

export const Overlay = OverlayTemplate.bind({});
Overlay.args = {
	show: "overlay",
};
