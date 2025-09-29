import { Feature, FeatureCollection } from 'geojson';
import { MlGeoJsonLayerProps } from '../MlGeoJsonLayer/MlGeoJsonLayer';
export type MlTransitionGeoJsonLayerProps = MlGeoJsonLayerProps & {
    transitionTime?: number;
    geojson?: Feature | FeatureCollection | null;
};
/**
 * Adds source and layer of types "line", "fill" or "circle" to display GeoJSON data on the map.
 */
declare const MlTransitionGeoJsonLayer: (props: MlTransitionGeoJsonLayerProps) => import("react/jsx-runtime").JSX.Element;
export default MlTransitionGeoJsonLayer;
//# sourceMappingURL=MlTransitionGeoJsonLayer.d.ts.map