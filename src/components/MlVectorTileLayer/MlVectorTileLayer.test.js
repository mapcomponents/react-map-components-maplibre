import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlVectorTileLayer from "./MlVectorTileLayer";

const testComponent = (
  <MlVectorTileLayer
    {...{
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
    }}
  />
);

layerRemovalTest(
  "<MlVectorTileLayer />",
  testComponent,
  /^.*"vector-tile-layer-_landuseLine_[0-9]*".*$/,
  "vector-tile-layer-_landuseLine_{unix-timestamp}"
);
sourceRemovalTest(
  "<MlVectorTileLayer />",
  testComponent,
  /^.*"vector-tile-source-[0-9]*".*$/,
  "vector-tile-source-{unix-timestamp}"
);
