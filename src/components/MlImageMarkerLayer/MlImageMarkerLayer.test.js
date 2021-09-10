import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlImageMarkerLayer from "./MlImageMarkerLayer";

const testComponent = (
  <MlImageMarkerLayer options={{ source: {} }} imgSrc="testImage" />
);

layerRemovalTest(
  "<MlImageMarkerLayer />",
  testComponent,
  /^.*\"MlImageMarkerLayer\-[0-9]*\".*$/,
  "MlImageMarkerLayer-{unix-timestamp}"
);
sourceRemovalTest(
  "<MlImageMarkerLayer />",
  testComponent,
  /^.*\"MlImageMarkerLayer\-[0-9]*\".*$/,
  "MlImageMarkerLayer-{unix-timestamp}"
);
