import MlGeoJsonLayer from "src/components/MlGeoJsonLayer/MlGeoJsonLayer";
import MlWmsLayer from "src/components/MlWmsLayer/MlWmsLayer";
import { LayerTree } from "./LayerTree";

export interface LayerTreeBranch {
  readonly id: string;
  readonly label: string;
  branches?: LayerTree;
  readonly selected?: boolean;
  layer?: React.ReactNode | typeof MlGeoJsonLayer | typeof MlWmsLayer;
}
