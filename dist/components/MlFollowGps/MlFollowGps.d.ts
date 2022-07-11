interface MlFollowGpsProps {
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
     * position circle paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the accuracy circle.
     * Use any available paint prop from layer type "fill".
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
     */
    circlePaint?: any;
    /**
     * Active button font color
     */
    onColor?: string;
    /**
     * Inactive button font color
     */
    offColor?: string;
    /**
     * Accuracy paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the accuracy circle.
     * Use any available paint prop from layer type "fill".
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
     */
    accuracyPaint?: any;
    /**
     * CSS style object that is applied to the button component
     */
    style?: any;
}
/**
 * Adds a button that makes the map follow the users GPS position using
 * navigator.geolocation.watchPosition if activated
 *
 */
declare const MlFollowGps: {
    (props: MlFollowGpsProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
        style: {
            minWidth: string;
            minHeight: string;
            width: string;
            height: string;
            backgroundColor: string;
            borderRadius: string;
            margin: number;
            fontSize: string;
            ":hover": {
                backgroundColor: string;
                color: string;
            };
        };
        onColor: string;
        offColor: string;
        showAccuracyCircle: boolean;
        showUserLocation: boolean;
        showOrientation: boolean;
    };
};
export default MlFollowGps;
