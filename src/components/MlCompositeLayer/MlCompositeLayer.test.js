import { layerRemovalTest, sourceRemovalTest } from "../../util";

import MlCompositeLayer from "./MlCompositeLayer";

const testComponent = <MlCompositeLayer />;

let testParams = [
  "<MlCompositeLayer />",
  testComponent,
  /^.*\"building\-3d\".*$/,
  "building-3d",
];

layerRemovalTest(...testParams);
