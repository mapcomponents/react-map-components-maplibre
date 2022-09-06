import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlGPXViewer from "./MlGPXViewer";

const testComponent = <MlGPXViewer />;

let sourceTestParams = [
	"<MlGPXViewer />",
	testComponent,
	/^.*\"import\-source\".*$/,
	"import-source",
];
let layer1TestParams = [
	"<MlGPXViewer />",
	testComponent,
	/^.*\"importer\-layer\-lines\".*$/,
	"importer-layer-lines",
];
let layer2TestParams = [
	"<MlGPXViewer />",
	testComponent,
	/^.*\"importer\-layer\-points\".*$/,
	"importer-layer-points",
];

layerRemovalTest(...layer1TestParams);
layerRemovalTest(...layer2TestParams);
sourceRemovalTest(...sourceTestParams);
