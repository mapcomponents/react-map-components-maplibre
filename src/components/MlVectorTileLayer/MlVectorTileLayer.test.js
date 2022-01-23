import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlVectorTileLayer from "./MlVectorTileLayer";
import { uuid_regex } from "../../setupTests";

const testComponent = (
  <MlVectorTileLayer
    {...{
      url: "https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf",
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
  new RegExp('^.*"MlVectorTileLayer-' + uuid_regex + '_landuseLine".*$'),
  "MlVectorTileLayer-{uuid}_landuseLine"
);
sourceRemovalTest(
  "<MlVectorTileLayer />",
  testComponent,
  new RegExp('^.*"MlVectorTileLayer-' + uuid_regex + '".*$'),
  "MlVectorTileLayer-{uuid}"
);
