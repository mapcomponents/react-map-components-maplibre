import { layerRemovalTest, sourceRemovalTest } from "../../util";

import { uuid_regex } from "../../setupTests";
import MlFillExtrusionLayer from "./MlFillExtrusionLayer";

const testComponent = <MlFillExtrusionLayer />;

let testParams = [
  "<MlFillExtrusionLayer />",
  testComponent,
  new RegExp('^.*"MlFillExtrusionLayer-' + uuid_regex + '".*$'),
  "MlFillExtrusionLayer-{uuid}",
];

layerRemovalTest(...testParams);
