/// <reference types="react" />
import { MlGeoJsonLayerProps } from '../MlGeoJsonLayer/MlGeoJsonLayer';
type MlTransitionGeoJsonLayerProps = MlGeoJsonLayerProps & {
    transitionTime: number;
};
/**
 * Adds source and layer of types "line", "fill" or "circle" to display GeoJSON data on the map.
 */
declare const MlTransitionGeoJsonLayer: (props: MlTransitionGeoJsonLayerProps) => JSX.Element;
export default MlTransitionGeoJsonLayer;
