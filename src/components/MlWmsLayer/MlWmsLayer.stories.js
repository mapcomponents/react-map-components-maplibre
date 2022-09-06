import React, { useState } from "react";

import MlWmsLayer from "./MlWmsLayer";
import TopToolbar from "../../ui_components/TopToolbar";
import Button from "@mui/material/Button";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";

const storyoptions = {
	title: "MapComponents/MlWmsLayer",
	component: MlWmsLayer,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => {
	const [showLayer, setShowLayer] = useState(true);

	return (
		<>
			<TopToolbar>
				<Button
					color="primary"
					variant={showLayer ? "contained" : "outlined"}
					onClick={() => setShowLayer(!showLayer)}
				>
					WMS
				</Button>
			</TopToolbar>
			<MlWmsLayer visible={showLayer} {...props} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	url: "https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",
	urlParameters: {
		layers: "nw_uraufnahme_rw",
	},
};
//
