import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlOsmLayer from "./MlOsmLayer";
import { uuid_regex } from "../../setupTests";

const testComponent = <MlOsmLayer />;

layerRemovalTest(
  "<MlOsmLayer />",
  testComponent,
  new RegExp('^.*"MlOsmLayer-' + uuid_regex + '".*$'),
  "MlOsmLayer-{uuid}"
);
sourceRemovalTest(
  "<MlOsmLayer />",
  testComponent,
  new RegExp('^.*"MlOsmLayer-' + uuid_regex + '".*$'),
  "MlOsmLayer-{uuid}"
);
