import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlGeoJsonLayer from "./MlGeoJsonLayer";
import geojson from "./assets/sample_1.json";
import { uuid_regex } from "../../setupTests";

const testComponent = <MlGeoJsonLayer type="line" geojson={geojson} />;

layerRemovalTest(
	"<MlGeoJsonLayer />",
	testComponent,
	new RegExp('^.*"MlGeoJsonLayer-' + uuid_regex + '".*$'),
	"MlGeoJsonLayer-{uuid}"
);
sourceRemovalTest(
	"<MlGeoJsonLayer />",
	testComponent,
	new RegExp('^.*"source-MlGeoJsonLayer-' + uuid_regex + '".*$'),
	"MlGeoJsonLayer-{uuid}"
);
