import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlSpatialElevationProfile from "./MlSpatialElevationProfile";
import { uuid_regex } from "../../setupTests";

const testComponent = <MlSpatialElevationProfile />;

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
