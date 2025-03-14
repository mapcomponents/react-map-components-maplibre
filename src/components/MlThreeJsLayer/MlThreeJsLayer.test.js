import { layerRemovalTest } from "../../util";
import React from 'react';
import MlThreeJsLayer from "./MlThreeJsLayer";

const testComponent = <MlThreeJsLayer
		{
				...{
						url:
								"https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf",
						layers: {
								landuseLine: {
										"source-layer": "landuse",
										layout: {
												"line-cap": "round",
												"line-join": "round",
										},
										paint: { "line-width": 1, "line-color": "#ff0000" },
								},
						},
						sourceOptions: {
								minzoom: 0,
								maxzoom: 20,
						},
				}
		}
/>;

layerRemovalTest(
	"<MlThreeJsLayer />",
	testComponent,
	/^.*\"3d\-model*\".*$/, // eslint-disable-line
	"3d-model"
);
