import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlWmsLayerMulti from "./MlWmsLayerMulti";

const testComponent = <MlWmsLayerMulti />;

layerRemovalTest(
  "<MlWmsLayerMulti />",
  testComponent,
  /^.*\"raster\-tile\-layer\-[0-9]*\".*$/,
  "raster-tile-layer-{unix-timestamp}"
);
sourceRemovalTest(
  "<MlWmsLayerMulti />",
  testComponent,
  /^.*\"raster\-tile\-source\-[0-9]*\".*$/,
  "raster-tile-source-{unix-timestamp}"
);
