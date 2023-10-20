import React from "react";

import MlScaleReference, { MlScaleReferenceProps } from "./MlScaleReference";

import TopToolbar from "../../ui_components/TopToolbar";
import mapContextDecorator from "../../decorators/MapContextDecorator";
import { useMediaQuery, Theme } from "@mui/material";


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

const ToolbarTemplate = (props: MlScaleReferenceProps ) => {
	return <TopToolbar unmovableButtons={<MlScaleReference {...props} />} />;
};
const OverlayTemplate = (props: MlScaleReferenceProps ) => {
	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	return (
		<div
			style={{
				position: "absolute",
				zIndex: 1000,
				bottom: mediaIsMobile ? "38px": "8px",
				left: "10px",
			}}
		>
			<MlScaleReference {...props} />
		</div>
	);
};

export const catalogueDemo = ToolbarTemplate.bind({});
catalogueDemo.args = {};

export const Overlay = OverlayTemplate.bind({});
Overlay.args = {	
};
