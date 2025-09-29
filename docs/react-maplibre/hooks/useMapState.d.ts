import { LayerState, ViewportState } from '../components/MapLibreMap/lib/MapLibreGlWrapper';
type useMapStateType = {
    layers: (LayerState | undefined)[];
    viewport: ViewportState | undefined;
};
/**
 * React hook that allows subscribing to map state changes
 *
 * @component
 */
declare function useMapState(props: {
    mapId?: string;
    watch?: {
        layers?: boolean;
        sources?: boolean;
        viewport?: boolean;
    };
    filter?: {
        includeBaseLayers?: boolean;
        matchLayerIds?: RegExp | string;
        matchSourceIds?: RegExp | string;
    };
}): useMapStateType;
declare namespace useMapState {
    var defaultProps: {
        mapId: undefined;
        watch: {
            layers: boolean;
            sources: boolean;
            viewport: boolean;
        };
        filter: {
            includeBaseLayers: boolean;
        };
    };
}
export default useMapState;
//# sourceMappingURL=useMapState.d.ts.map