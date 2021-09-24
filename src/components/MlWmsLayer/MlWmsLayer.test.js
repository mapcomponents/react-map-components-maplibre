import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlWmsLayer from "./MlWmsLayer";

const testComponent = <MlWmsLayer />;

layerRemovalTest(
  "<MlWmsLayer />",
  testComponent,
  /^.*\"raster\-tile\-layer\-[0-9]*\".*$/,
  "raster-tile-layer-{unix-timestamp}"
);
sourceRemovalTest(
  "<MlWmsLayer />",
  testComponent,
  /^.*\"raster\-tile\-source\-[0-9]*\".*$/,
  "raster-tile-source-{unix-timestamp}"
);
