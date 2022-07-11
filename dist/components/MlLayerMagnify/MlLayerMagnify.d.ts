import "./style.css";
interface MlLayerMagnifyProps {
    /**
     * Id of the first MapLibre instance
     */
    map1Id: string;
    /**
     * Id of the second MapLibre instance
     */
    map2Id: string;
    /**
     * Size of the "magnifier"-circle
     */
    magnifierRadius?: number;
}
/**
 *
 * Hides the MapLibreMap referenced by props.map2Id except for the "magnifier"-circle that reveals
 * the map and can be dragged around on top of the MapLibreMap referenced by props.map1Id
 */
declare const MlLayerMagnify: {
    (props: MlLayerMagnifyProps): JSX.Element;
    defaultProps: {
        magnifierRadius: number;
    };
};
export default MlLayerMagnify;
