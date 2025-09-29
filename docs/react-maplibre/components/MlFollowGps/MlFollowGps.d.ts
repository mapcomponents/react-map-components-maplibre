import { CircleLayerSpecification, FillLayerSpecification } from 'maplibre-gl';
export interface MlFollowGpsProps {
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
     * By default a dot will be shown on the map at the user's location. Set to false to disable.
     */
    showUserLocation?: boolean;
    /**
     * By default a cone will be shown on the map at the user's location to indicate the device's orientation.
     * Set to false to disable.
     */
    showOrientation?: boolean;
    /**
     * By default, if showUserLocation is true, a transparent circle will be drawn around the user location
     * indicating the accuracy (95% confidence level) of the user's location. Set to false to disable.
     */
    showAccuracyCircle?: boolean;
    /**
     * Use the MapLibre.flyTo function to center the map to the current users position if true.
     * Otherwise the MapLibre.setCenter function is used.
     */
    useFlyTo?: boolean;
    /**
     * Center map to current position once updated location data is recieved.
     * "false" will center the map once on component activation and then display the updated user location on the map.
     */
    centerUserPosition?: boolean;
    /**
     * Orientation cone paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the orientation cone polygon.
     * Use any available paint prop from layer type "fill".
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
     */
    orientationConePaint?: FillLayerSpecification['paint'];
    /**
     * Position circle paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the position circle.
     * Use any available paint prop from layer type "circle".
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
     */
    circlePaint?: CircleLayerSpecification['paint'];
    /**
     * Active button font color
     */
    onColor?: string;
    /**
     * Inactive button font color
     */
    offColor?: string;
    /**
     * Accuracy paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the accuracy polygon.
     * Use any available paint prop from layer type "fill".
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
     */
    accuracyPaint?: FillLayerSpecification['paint'];
}
/**
 * Adds a button that makes the map follow the users GPS position using
 * navigator.geolocation.watchPosition if activated
 *
 */
declare const MlFollowGps: (props: MlFollowGpsProps) => import("react/jsx-runtime").JSX.Element;
export default MlFollowGps;
//# sourceMappingURL=MlFollowGps.d.ts.map