import "./style.css";
interface MlLayerSwipeProps {
    /**
     * Id of the first MapLibre instance.
     */
    map1Id: string;
    /**
     * Id of the second MapLibre instance.
     */
    map2Id: string;
}
/**
 *  creates a split view of 2 synchronised maplibre instances
 */
declare const MlLayerSwipe: (props: MlLayerSwipeProps) => JSX.Element;
export default MlLayerSwipe;
