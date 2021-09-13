import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlOsmLayer from "./MlOsmLayer";

const testComponent = <MlOsmLayer />;

layerRemovalTest(
  "<MlOsmLayer />",
  testComponent,
  /^.*\"raster\-tile\-layer\-[0-9]*\".*$/,
  "raster-tile-layer-{unix-timestamp}"
);
sourceRemovalTest(
  "<MlOsmLayer />",
  testComponent,
  /^.*\"raster\-tile\-source\-[0-9]*\".*$/,
  "raster-tile-source-{unix-timestamp}"
);
