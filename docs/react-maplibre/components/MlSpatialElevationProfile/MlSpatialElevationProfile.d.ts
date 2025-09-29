import { Feature, FeatureCollection } from 'geojson';
/**
 * MlSpatialElevationProfile returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 *
 * @component
 */
interface geojson {
    features: Feature | FeatureCollection | undefined;
}
export interface MlSpatialElevationProfileProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * GeoJSON data that is supposed to be rendered by this component.
     */
    geojson: geojson | FeatureCollection | undefined;
    /**
     * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
     */
    idPrefix?: string;
    /**
     * Number describes the factor of the height of the elevation
     */
    elevationFactor?: number;
    /**
     * The layerId of an existing layer this layer should be rendered visually beneath
     * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
     */
    insertBeforeLayer?: string;
}
declare const MlSpatialElevationProfile: (props: MlSpatialElevationProfileProps) => import("react/jsx-runtime").JSX.Element;
export default MlSpatialElevationProfile;
//# sourceMappingURL=MlSpatialElevationProfile.d.ts.map