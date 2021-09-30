import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlOsmLayer from "./MlOsmLayer";
import { uuid_regex } from "../../setupTests";

const testComponent = <MlOsmLayer />;

layerRemovalTest(
  "<MlOsmLayer />",
  testComponent,
  new RegExp('^.*"MlOsmLayer-layer-' + uuid_regex + '".*$'),
  "MlOsmLayer-layer-{uuid}"
);
sourceRemovalTest(
  "<MlOsmLayer />",
  testComponent,
  new RegExp('^.*"MlOsmLayer-source-' + uuid_regex + '".*$'),
  "MlOsmLayer-source-{uuid}"
);
