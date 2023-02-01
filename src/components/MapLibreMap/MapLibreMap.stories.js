import React, { useState } from "react";

import MapLibreMap from "./MapLibreMap";
import { MapComponentsProvider } from "../../contexts/MapContext";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import { Button } from "@mui/material";
import TopToolbar from "../../ui_components/TopToolbar";
import sample_geojson_1 from "../MlGeoJsonLayer/assets/sample_1.json";

const storyoptions = {
	title: "Core/MapLibreMap",
	component: MapLibreMap,
	argTypes: {
		options: {
			control: {
				type: "object",
			},
		},
	},

  parameters: {
    sourceLink: 'components/MapLibreMap/MapLibreMap.tsx'
	}
};
export default storyoptions;

const Template = (args) => {
	return (
		<MapComponentsProvider>
			<MapLibreMap
				options={{ ...args.options }}
				style={{
					position: "absolute",
					height: "100vh",
					width: "100vw",
					top: 0,
					right: 0,
					left: 0,
					bottom: 0,
					zIndex: 100,
				}}
			/>
		</MapComponentsProvider>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
	options: {
		style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
		center: [8.607, 53.1409349],
		zoom: 14,
	},
};

const StyleChangeTemplate = (args) => {
	const [activeStyle, setActiveStyle] = useState(
		"https://wms.wheregroup.com/tileserver/style/osm-fiord-color.json"
	);

	return (
		<MapComponentsProvider>
			<TopToolbar>
				<Button
					onClick={() =>
						setActiveStyle("https://wms.wheregroup.com/tileserver/style/osm-bright.json")
					}
					variant="contained"
					sx={{marginRight:'5px'}}
				>
					OSM-Bright
				</Button>
				<Button
					onClick={() =>
						setActiveStyle("https://wms.wheregroup.com/tileserver/style/osm-fiord-color.json")
					}
					variant="contained"
				>
					OSM-Fiord-Color
				</Button>
			</TopToolbar>
			<MapLibreMap
				options={{ ...args.options, style: activeStyle }}
				style={{
					position: "absolute",
					height: "100vh",
					width: "100vw",
					top: 0,
					right: 0,
					left: 0,
					bottom: 0,
					zIndex: 100,
				}}
			/>
			<MlGeoJsonLayer type="line" geojson={sample_geojson_1} />
		</MapComponentsProvider>
	);
};

export const StyleChangeConfig = StyleChangeTemplate.bind({});
StyleChangeConfig.args = {
	options: {
		zoom: 14.5,
		center: [7.0851268, 50.73884],
	},
};
StyleChangeConfig.parameters = {};
