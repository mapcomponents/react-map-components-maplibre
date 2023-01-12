interface useCameraFollowPathProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order
     * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
     */
    insertBeforeLayer?: string;
    pause?: boolean;
    zoom?: number;
    pitch?: number;
    speed?: number;
    kmPerStep?: number;
    route?: any;
    stepDuration?: number;
    timeoutId?: number;
}
export type { useCameraFollowPathProps };
/**
 * Component template
 *
 */
declare const useCameraFollowPath: {
    (props: useCameraFollowPathProps): {
        play: () => void;
        reset: () => void;
    };
    defaultProps: {
        mapId: undefined;
        zoom: number;
    };
};
export default useCameraFollowPath;
