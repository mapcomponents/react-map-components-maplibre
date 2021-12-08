import { layerRemovalTest, sourceRemovalTest } from "../../util";
import { uuid_regex } from "../../setupTests";

import MlImageMarkerLayer from "./MlImageMarkerLayer";

const testComponent = <MlImageMarkerLayer options={{ source: {} }} imgSrc="testImage" />;

layerRemovalTest(
  "<MlImageMarkerLayer />",
  testComponent,
  new RegExp('^.*"MlImageMarkerLayer-' + uuid_regex + '".*$'),
  "MlImageMarkerLayer-{uuid}"
);
sourceRemovalTest(
  "<MlImageMarkerLayer />",
  testComponent,
  new RegExp('^.*"MlImageMarkerLayer-' + uuid_regex + '".*$'),
  "MlImageMarkerLayer-{uuid}"
);
