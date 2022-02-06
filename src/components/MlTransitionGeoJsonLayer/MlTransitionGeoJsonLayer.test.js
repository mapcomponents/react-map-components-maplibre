import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlTransitionGeoJsonLayer from "./MlTransitionGeoJsonLayer";
import geojson from "./assets/sample_1.json";
import { uuid_regex } from "../../setupTests";

const testComponent = <MlTransitionGeoJsonLayer type="line" geojson={geojson} />;

layerRemovalTest(
  "<MlTransitionGeoJsonLayer />",
  testComponent,
  new RegExp('^.*"MlGeoJsonLayer-' + uuid_regex + '".*$'),
  "MlTransitionGeoJsonLayer-{uuid}"
);
sourceRemovalTest(
  "<MlTransitionGeoJsonLayer />",
  testComponent,
  new RegExp('^.*"MlGeoJsonLayer-' + uuid_regex + '".*$'),
  "MlTransitionGeoJsonLayer-{uuid}"
);
