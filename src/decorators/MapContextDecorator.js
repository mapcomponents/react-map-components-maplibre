import React from "react";

import { MapComponentsProvider } from "../index";
import MapLibreMap from "../components/MapLibreMap/MapLibreMap";
import "./style.css";
import MlNavgiationTools from "../components/MlNavigationTools/MlNavigationTools";
import ThemeWrapper from "./ThemeWrapper";

const decorators = [
	(Story) => (
		<div className="fullscreen_map">
			<ThemeWrapper>
				<MapComponentsProvider>
					{Story()}
					<MapLibreMap
						options={{
							zoom: 14.5,
							style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
							center: [7.0851268, 50.73884],
						}}
						mapId="map_1"
					/>
					<MlNavgiationTools
						sx={{ top: "10px", right: "5px" }}
						showZoomButtons={false}
						mapId="map_1"
					/>
				</MapComponentsProvider>
			</ThemeWrapper>
		</div>
	),
];

export default decorators;
