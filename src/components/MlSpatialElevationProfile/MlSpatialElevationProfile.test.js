import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlSpatialElevationProfile from "./MlSpatialElevationProfile";
import { uuid_regex } from "../../setupTests";
const sampleGeojson = {
	"type": "FeatureCollection",
	"features": [
			{
					"type": "Feature",
					"properties": {
							"name": "Rundwanderung auf dem Wiedweg zwischen Seelbach und Oberlahr",
							"desc": "Diese Rundtour gibt mir viele historische Einblicke und zeigt mir einzigartige und mir bisher verborgene Kultur- und Naturschönheiten. Eine rundum spannende und erlebnisreiche Tour.",
							"type": "hikingTourTrail"
					},
					"geometry": {
							"type": "LineString",
							"coordinates": [
									[
											7.526536,
											50.647383,
											267.71535
									],
									[
											7.526617,
											50.647247,
											267.83347
									],
							]
					}
			}
	]
}

// eslint-disable-next-line react/react-in-jsx-scope
const testComponent = <MlSpatialElevationProfile geojson={sampleGeojson} />;

layerRemovalTest(
	"<MlSpatialElevationProfile />",
	testComponent,
	new RegExp('^.*"elevationprofile-layer-' + uuid_regex + '".*$'),
	"elevationprofile-layer-{uuid}"
);
sourceRemovalTest(
	"<MlSpatialElevationProfile />",
	testComponent,
	new RegExp('^.*"elevationprofile-' + uuid_regex + '".*$'),
	"elevationprofile-{uuid}"
);
