import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlGeoJsonLayer from "./MlGeoJsonLayer";
import geojson from "./assets/sample_1.json";

const testComponent = <MlGeoJsonLayer type="line" geojson={geojson} />;

layerRemovalTest(
  "<MlGeoJsonLayer />",
  testComponent,
  /^.*\"MlGeoJsonLayer\-[0-9]*\".*$/,
  "MlGeoJsonLayer-{unix-timestamp}"
);
sourceRemovalTest(
  "<MlGeoJsonLayer />",
  testComponent,
  /^.*\"MlGeoJsonLayer\-[0-9]*\".*$/,
  "MlGeoJsonLayer-{unix-timestamp}"
);
