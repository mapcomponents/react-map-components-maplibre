import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlWmsLayer from "./MlWmsLayer";
import { uuid_regex } from "../../setupTests";

const testComponent = <MlWmsLayer url="mock" urlParameters={{ layers: "mock" }} />;

layerRemovalTest(
	"<MlWmsLayer />",
	testComponent,
	new RegExp('^.*"MlWmsLayer-' + uuid_regex + '".*$'),
	"MlWmsLayer-{uuid}"
);
sourceRemovalTest(
	"<MlWmsLayer />",
	testComponent,
	new RegExp('^.*"MlWmsLayer-' + uuid_regex + '".*$'),
	"MlWmsLayer-{uuid}"
);
