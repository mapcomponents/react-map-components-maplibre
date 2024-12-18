/// <reference types="react" />
interface MlMarkerProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * The layerId of an existing layer this layer should be rendered visually beneath
     * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
     */
    insertBeforeLayer?: string;
    /**
     * Longitude of the marker position
     */
    lng: number;
    /**
     * Latitude of the marker position
     */
    lat: number;
    /**
     * Content of the description popup
     */
    content?: string;
}
/**
 * Adds a marker to the map and displays the contents of the "content" property in an iframe next to it
 */
declare const MlMarker: {
    (props: MlMarkerProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
    };
};
export default MlMarker;
