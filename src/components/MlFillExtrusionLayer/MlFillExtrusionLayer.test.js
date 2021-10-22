import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlFillExtrusionLayer from "./MlFillExtrusionLayer";

const testComponent = <MlFillExtrusionLayer />;

let testParams = [
  "<MlFillExtrusionLayer />",
  testComponent,
  /^.*\"building\-3d\".*$/,
  "building-3d",
];

layerRemovalTest(...testParams);
