import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlGpxViewer from "./MlGpxViewer";

const testComponent = <MlGpxViewer />;

let sourceTestParams = [
	"<MlGpxViewer />",
	testComponent,
	/^.*\"import\-source\".*$/,
	"import-source",
];
let layer1TestParams = [
	"<MlGpxViewer />",
	testComponent,
	/^.*\"importer\-layer\-lines\".*$/,
	"importer-layer-lines",
];
let layer2TestParams = [
	"<MlGpxViewer />",
	testComponent,
	/^.*\"importer\-layer\-points\".*$/,
	"importer-layer-points",
];

layerRemovalTest(...layer1TestParams);
layerRemovalTest(...layer2TestParams);
sourceRemovalTest(...sourceTestParams);
